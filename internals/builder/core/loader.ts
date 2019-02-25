// Dependencies
import * as path    from 'path';
import * as readdir from 'recursive-readdir';

// Local
import * as types   from './types';


export const loadTasks = (tasksDirectory: string) => new Promise<types.Task[]>((resolve, reject) => {
  readdir(tasksDirectory, (err, files) => {
    if (err) reject(err);
    const tasks = files
      .filter(file => file !== 'index.ts')
      .map(file => require(path.resolve(tasksDirectory, file)).default)
      // Filter undefined modules
      .filter(file => file);
    resolve(tasks);
  });
});

export default loadTasks;
