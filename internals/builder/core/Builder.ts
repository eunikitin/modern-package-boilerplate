// Dependencies
import * as path                     from 'path';
import * as yargs                    from 'yargs';

import envDefaults, { PresetSchema } from 'root/default.env';

// Local
import * as logger                   from './log';
import { TaskRunner }                from './task';
import taskLoader                    from './loader';
import * as formatters               from './formatters';
import * as paths                    from './paths';
import * as cli                      from './cli';
import * as environment              from './environment';
import * as types                    from './types';


type onRunCallback = (runner: TaskRunner) => void;

const log = (task, message: string) => logger.info({ category: task, message });

export default class Builder {
  root:        string;
  state:       types.State;
  environment: object;
  cli:         yargs.Argv;
  runner:      TaskRunner;
  runCallback: onRunCallback = () => {};

  constructor() {
    this.root   = process.cwd();
    this.cli    = yargs;
    this.runner = new TaskRunner();
    this.state  = {};

    this.initialize().then();
  }

  private async initialize() {
    this.environment = await this.initializeEnvironment(['development']);

    const data = {
      runner:      this.runner,
      state:       this.state,
      cli:         this.cli,
      environment: this.environment,
    };

    this.initializeLogging();

    const tasks = await this.initializeTasks();
    this.runCallback(this.runner);
    tasks.forEach(task => this.cli = task.cli(data));
    const argv = this.cli.argv as any;
  }

  private initializeLogging() {
    const _log   = console.log;
    const _warn  = console.warn;
    const _error = console.error;
    const _info  = console.info;
    const _debug = console.debug;

    console.log   = (message: string, ...optionalParams: any[]) =>
      logger.info(cli.substitute(message, ...optionalParams));

    console.warn  = (message: string, ...optionalParams: any[]) =>
      logger.info(cli.substitute(message, ...optionalParams));

    console.info  = (message: string, ...optionalParams: any[]) =>
      logger.info(cli.substitute(message, ...optionalParams));

    console.debug = (message: string, ...optionalParams: any[]) =>
      logger.debug({ data: cli.substitute(message, ...optionalParams) });

    console.error = (message: string, ...optionalParams: any[]) =>
      logger.error(cli.substitute(message, ...optionalParams));

    process.on('uncaughtException', err => logger.fatal(err));
    process.on('unhandledRejection', err => logger.fatal(err));

    this.runner.on('start', (data) => {
      log(data.name, ''.concat(
        formatters.state('Starting'),
        '...',
      ));
    });

    this.runner.on('finish', (data) => {
      log(data.name, ''.concat(
        formatters.state('Finished'),
        ' ',
        formatters.time(data.deltaTime),
      ));
    });

    this.runner.on('error', (data) => {
      logger.fatal(
        {
          category: 'Task',
          message: `${formatters.task(data.name)} task failed. Reason: ${data.error.message}`,
        },
        data.error,
      );
    });
  }

  private async initializeTasks() {
    const tasks = await taskLoader(path.resolve(paths.builderDir(), 'tasks'));

    const data = {
      runner:      this.runner,
      state:       this.state,
      cli:         this.cli,
      environment: this.environment,
    };

    tasks.forEach((task) => {
      const callback = task.callback(data);
      this.runner.task(task.name, callback);
    });

    return tasks;
  }

  private async initializeEnvironment(presets: string[], override: PresetSchema = {}) {
    const presetsModules = await environment.presetLoader<PresetSchema>(
      path.resolve(paths.builderDir(),
        'environments',
      ),
    );
    const env = new environment.Environment(presetsModules, envDefaults);

    return env.getSettings(...presets, override);
  }

  run(callback: (runner: TaskRunner) => void) {
    this.runCallback = callback;
  }
}
