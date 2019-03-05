// Dependencies
import * as path        from 'path';
import * as rollup      from 'rollup';
import * as browserSync from 'browser-sync';

// Core
import * as types       from 'builder/core/types';
import * as paths       from 'builder/core/paths';

// Lib
import { params }       from 'builder/lib/cli';

// Configs
import cRollup          from 'builder/configs/rollup.config';


const initServer = () => {
  const server = browserSync.create();

  server.init({
    server: {
      baseDir: [
        path.resolve(paths.builderDir(), 'lib/server/public'),
        path.resolve(paths.buildDir()),
      ],
    },
  });

  return server;
};

const bundle = environment => async function bundle() {
  const config = cRollup(environment);

  if (environment.rollup.watch) {
    const watcher = rollup.watch([config]);

    if (environment.target === 'web') {
      const server = initServer();

      watcher.on('event', async (event) => {
        if (event.code === 'END') server.reload();
      });
    }

  } else {
    const bundleData = await rollup.rollup(config);
    bundleData.write(config.output);

    if (environment.target === 'web') {
      initServer();
    }
  }
};

const Task: types.Task = {
  name: 'bundle',
  callback: ({ runner, environment }) => runner.series('copy', bundle(environment)),
  cli: ({ runner, cli }) => (
    cli.command(
      'bundle',
      'Build project bundle',
      Object.assign({},
        params.environment.build(),
        params.environment.exec(),
        params.webpack.log.verbose(),
        params.webpack.analyzeBundle(),
      ),
      () => {
        runner.run('bundle');
      },
    )
  ),
};

export default Task;
