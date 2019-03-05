// Dependencies
import * as rollup      from 'rollup';
import * as path        from 'path';
import * as merge       from 'deepmerge';

// Rollup plugins
import * as progress    from 'rollup-plugin-progress';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as typescript  from 'rollup-plugin-typescript';
import * as replace     from 'rollup-plugin-replace';
import * as commonjs    from 'rollup-plugin-commonjs';
import { uglify }       from 'rollup-plugin-uglify';

// Configs
import { PresetSchema } from 'root/default.env';

// Local
import * as paths       from 'builder/core/paths';


const env = process.env.NODE_ENV;


export default (environment: PresetSchema): rollup.RollupOptions => {
  let config: rollup.RollupOptions = {
    input: path.resolve(paths.srcDir(), 'index.ts'),

    external: ['react', 'react-dom'],

    output: {
      file: path.resolve(paths.distDir(), 'index.js'),
      format: 'umd',
      name: 'modernPackageBoilerplate',
    },

    plugins: [
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      typescript(),
      commonjs(),
    ],
  };

  if (environment.environment.buildEnv === 'production') {
    config.plugins.push(
      uglify({
        compress: {
          pure_getters: true,
          unsafe:       true,
          unsafe_comps: true,
          warnings:     false,
        },
      }),
    );
  }

  if (environment.environment.buildEnv === 'development') {
    config = merge(
      config,
      {
        watch: {
          chokidar: true,
          include: ['./**/*'],
        },
        output: {
          sourcemap: true,
        },
      },
    );
  }

  if (environment.rollup.log) {
    config.plugins.push(
      progress({
        clearLine: false,
      }),
    );
  }

  return config;
};
