// Dependencies
import { Linter, Configuration } from 'tslint';

// Core
import * as types                from 'builder/core/types';


const lint = () => async function lint() {
  const configurationFilename = './tslint.json';
  const options = {
    fix: false,
    formatter: 'stylish',
  };

  const program = Linter.createProgram('tsconfig.json');
  const linter  = new Linter(options, program);
  const files   = Linter.getFileNames(program);

  files.forEach((fileName) => {
    const fileContents  = program.getSourceFile(fileName).getFullText();
    const configuration = Configuration.findConfiguration(configurationFilename, fileName).results;

    linter.lint(fileName, fileContents, configuration);
  });

  const result = linter.getResult();

  console.error(result.output);
};

const Task: types.Task = {
  name: 'lint',
  callback: ({ runner, environment }) => lint(),
  cli: ({ runner, cli }) => (
    cli.command(
      'lint',
      'lint',
      // Object.assign({},
      //   params.environment.build(),
      //   params.environment.exec(),
      //   params.webpack.log.verbose(),
      //   params.webpack.analyzeBundle(),
      // ),
      () => {
        runner.run('lint');
      },
    )
  ),
};

export default Task;
