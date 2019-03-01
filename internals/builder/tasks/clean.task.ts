// Core
import * as types   from 'builder/core/types';
import * as paths   from 'builder/core/paths';

// Lib
import { cleanDir } from 'builder/lib/fs';


const callback = () => async function clean() {
  return Promise.all([
    cleanDir(`${paths.buildDir()}/*`, {
      dot: true,
      ignore: ['build/.git'],
      nosort: true,
    }),
  ]);
};

const Task: types.Task = {
  name: 'clean',
  callback,
  cli: ({ runner, cli }) => cli.command(
    'clean',
    'Clean build directory',
    {},
    () => {
      runner.run('clean');
    },
  ),
};

export default Task;
