// Dependencies
import path         from 'path';
import merge        from 'merge-deep';

// Rollup plugins
import nodeResolve  from 'rollup-plugin-node-resolve';
import babel        from 'rollup-plugin-babel';
import replace      from 'rollup-plugin-replace';
import commonjs     from 'rollup-plugin-commonjs';
import { uglify }   from 'rollup-plugin-uglify';

// Configs
import cBabelrc     from './babel.library.config';


const env = process.env.NODE_ENV;


const base = {
  input: path.resolve('src/index.js'),

  external: ['react', 'react-dom'],

  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'modernPackageBoilerplate',
  },

  plugins: [
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    babel({
      babelrc: false,
      ...cBabelrc,
    }),
    commonjs(),
  ],
};

const development = merge(
  base,
  {
    output: {
      sourcemap: true,
    },
  },
);

const production = merge(
  base,
  {
    plugins: [
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
);


export default {
  development,
  production,
};
