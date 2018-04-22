// Dependencies
import  gulp from 'gulp';
import * as rollup from 'rollup';

// Configs
import cRollup from './rollup.config';


gulp.task('build:dev', () => rollup.rollup(cRollup.development).then(bundle => (bundle.write(cRollup.development.output))));

gulp.task('build:prod', () => rollup.rollup(cRollup.production).then(bundle => (bundle.write(cRollup.production.output))));
