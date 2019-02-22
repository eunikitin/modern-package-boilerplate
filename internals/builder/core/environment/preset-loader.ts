// Dependencies
import * as readdir from 'recursive-readdir';
import * as path    from 'path';

// Local
import * as types   from './types';


export const loadPresets = <T>(presetsDirectory: string) =>
  new Promise<types.Preset<T>[]>((resolve, reject) => {
    readdir(presetsDirectory, (err, files) => {
      if (err) reject(err);
      const tasks = files
        .map(file => ({
          name: path.basename(file, '.env.ts'),
          data: require(path.resolve(presetsDirectory, file)).default,
        }))
        // Filter undefined modules
        .filter(file => file);
      resolve(tasks);
    });
  });

export default loadPresets;
