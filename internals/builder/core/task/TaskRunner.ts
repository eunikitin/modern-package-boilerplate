// Dependencies
import { EventEmitter } from 'events';
import * as Undertaker  from 'undertaker';
import * as uniqid      from 'uniqid';

// Local
import * as types       from './types';
import * as errors      from './errors';


export class TaskRunner extends EventEmitter {
  private undertaker:    Undertaker;
  private tasks:         Set<string>;
  private deferredTasks: types.DeferredTask[];
  private compositions:  types.TaskCompositions;

  constructor() {
    super();

    this.undertaker    = new Undertaker();
    this.compositions  = {};
    this.deferredTasks = [];
    this.tasks         = new Set();

    this.undertaker.on('error', (data) => {
      this.emit('error', data);
    });
  }

  task(taskName: string, callback: types.TaskCallback) {
    this.tasks.add(taskName);
    if (typeof callback === 'string') {
      this.defineDeferredTask(taskName, callback);
    } else {
      this.defineTask(taskName, callback);
    }
  }

  series(...tasks: Undertaker.Task[]) {
    const id = uniqid();
    this.compositions[id] = {
      type: 'series',
      tasks,
    };
    return id;
  }

  parallel(...tasks: Undertaker.Task[]) {
    const id = uniqid();
    this.compositions[id] = {
      type: 'parallel',
      tasks,
    };
    return id;
  }

  initComposition(id: string) {
    const association = this.compositions[id];

    const normalizedTasks = association.tasks
    // Task can be a taskName, compositionId, task callback
      .map((task) => {
        if (typeof task === 'string') {
          const isCompositionId = Object.keys(this.compositions).some(id => id === task);

          if (!isCompositionId && !this.tasks.has(task)) {
            throw new errors.TaskNeverDefinedError(`Task never defined: ${task}`);
          }

          if (isCompositionId) return this.initComposition(task);
        }
        return task;
      });

    if (association.type === 'series') {
      return this.undertaker.series(normalizedTasks);
    }
    return this.undertaker.parallel(normalizedTasks);
  }

  run(taskName: string) {
    const tasksInitialized: string[] = [];
    this.deferredTasks.forEach(() => {
      this.deferredTasks.forEach((deferredTask) => {
        try {
          if (!tasksInitialized.some(name => deferredTask.name === name)) {
            this.task(
              deferredTask.name,
              this.initComposition(deferredTask.callback),
            );
            tasksInitialized.push(deferredTask.name);
          }
        } catch (err) {
          if (err instanceof errors.TaskNeverDefinedError) throw err;
        }
      });
    });

    this.undertaker.task(taskName)(() => {});
  }

  private defineTask<T = any>(name: string, callback: types.LeafCallback<void>) {
    return this.undertaker.task(name, () => new Promise((resolve, reject) => {
      const start = new Date();

      this.emit('start', ({ name }));

      const resolveCallback = () => {
        const end = new Date();
        const deltaTime = end.getTime() - start.getTime();

        this.emit('finish', ({ name, deltaTime }));

        resolve();
      };

      const returnValue = callback(resolveCallback, reject);

      if (returnValue instanceof Promise) {
        returnValue.then(resolveCallback, reject);
      }
    }));
  }

  private defineDeferredTask(name: string, callback: types.BranchCallback) {
    this.deferredTasks.push({ name, callback });
  }
}

export default TaskRunner;
