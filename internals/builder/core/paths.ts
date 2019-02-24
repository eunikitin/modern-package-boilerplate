// Dependencies
import * as path from 'path';


export const rootDir = () => process.cwd();

export const packageDir = () => path.resolve(rootDir(), 'package');
export const srcDir     = () => path.resolve(packageDir(), 'src');
export const builderDir = () => path.resolve(__dirname, '../');
export const buildDir   = () => path.resolve(rootDir(), 'build');
export const distDir    = () => path.resolve(buildDir(), 'dist');
export default {
  rootDir,
  srcDir,
  builderDir,
  buildDir,
};
