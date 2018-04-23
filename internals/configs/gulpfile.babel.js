// Dependencies
import  gulp       from 'gulp';
import * as rollup from 'rollup';
import rimraf      from 'rimraf';
import path        from 'path';
import fs          from 'fs';

// Configs
import cRollup     from './rollup.config';
import cJest       from './jest';


gulp.task('clean', (cb) => { rimraf(path.resolve('./lib'), fs, () => {}); cb(); });

gulp.task('build:dev', () => rollup.rollup(cRollup.development).then(bundle => (bundle.write(cRollup.development.output))));

gulp.task('build:prod', () => rollup.rollup(cRollup.production).then(bundle => (bundle.write(cRollup.production.output))));

gulp.task('test', () => gulp.src('test').pipe(jest(cJest.test)));

gulp.task('cover', () => gulp.src('test').pipe(jest(cJest.coverage)));