import * as types    from 'builder/core/types';
//
//
// const Task: types.Task = {
//   name: 'develop',
//   callback: ({ runner }) => runner.series('clean', 'configure', 'devserver'),
//   cli: ({ runner, cli }) => cli.command(
//     'develop',
//     'develop',
//     {},
//     () => {
//       runner.run('develop');
//     },
//   ),
// };
//
// export default Task;


const Task: types.Task = {
  name: 'develop',
  callback: ({ runner }) => runner.series('clean', 'test', 'lint', 'bundle'),
  cli: ({ runner, cli }) => cli.command(
    'develop',
    'develop',
    {},
    () => {
      runner.run('develop');
    },
  ),
};

export default Task;
