// Dependencies
import  gulp       from 'gulp';
import * as rollup from 'rollup';
import rimraf      from 'rimraf';
import path        from 'path';
import fs          from 'fs';

// Gulp plugins
import jest        from 'gulp-jest';
import run         from 'gulp-run';
import eslint      from 'gulp-eslint';

// Configs
import cRollup     from './rollup.config';
import cJest       from './jest';
import cESLint     from '../../.eslintrc.json';


gulp.task('clean', (cb) => { rimraf(path.resolve('./lib'), fs, () => {}); cb(); });

gulp.task('build:dev', () => rollup.rollup(cRollup.development).then(bundle => (bundle.write(cRollup.development.output))));

gulp.task('build:prod', () => rollup.rollup(cRollup.production).then(bundle => (bundle.write(cRollup.production.output))));

gulp.task('test', () => gulp.src('test').pipe(jest(cJest.test)));

gulp.task('cover', () => gulp.src('test').pipe(jest(cJest.coverage)));

gulp.task('flow', () => run('flow --color always', { verbosity: 3 }).exec());

gulp.task('lint', () => gulp.src('src/**/*.js').pipe(eslint(cESLint)).pipe(eslint.format()).pipe(eslint.failAfterError()));

