// Dependencies
import * as path   from 'path';
import { runCLI }  from 'jest-cli';

// Core
import * as types  from 'builder/core/types';
import * as paths  from 'builder/core/paths';


const test = environment => async function test() {
  const jestConfig: any = {
    roots:           ['./package'],
    testRegex:       '\\.test\\.ts$',
    collectCoverage: environment.jest.collectCoverage,
  };

  const success = await runCLI(jestConfig as any, [path.resolve(paths.rootDir())]);
};

const Task: types.Task = {
  name: 'test',
  callback: ({ environment }) => test(environment),
  cli: ({ runner, cli }) => (
    cli.command(
      'test',
      'Run tests',
      () => {
        runner.run('test');
      },
    )
  ),
};

export default Task;
