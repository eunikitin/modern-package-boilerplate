// Dependencies
import * as path     from 'path';

// Core
import * as types    from 'builder/core/types';
import * as paths    from 'builder/core/paths';

// Lib
import * as fs       from 'builder/lib/fs';


const copy = () => async function copy() {
  await fs.makeDir(path.resolve(paths.rootDir(), 'build'));

  const packageSrc     = path.resolve(paths.packageDir(), 'package.json');
  const packageLockSrc = path.resolve(paths.packageDir(), 'package-lock.json');
  const readme         = path.resolve(paths.rootDir(), 'README.md');
  const license        = path.resolve(paths.rootDir(), 'LICENSE');

  if (await fs.exists(packageSrc)) {
    await fs.copyFile(
      path.resolve(paths.rootDir(), 'README.md'),
      path.resolve(paths.buildDir(), 'package.json'),
    );
  }

  if (await fs.exists(packageLockSrc)) {
    await fs.copyFile(
      packageLockSrc,
      path.resolve(paths.buildDir(), 'package-lock.json'),
    );
  }

  if (readme) {
    await fs.copyFile(
      readme,
      path.resolve(paths.buildDir(), 'README.md'),
    );
  }

  if (license) {
    await fs.copyFile(
      license,
      path.resolve(paths.buildDir(), 'LICENSE'),
    );
  }
};

const Task: types.Task = {
  name: 'copy',
  callback: () => copy(),
  cli: ({ runner, cli }) => cli.command(
    'copy',
    'Copy project files to build directory',
    {},
    () => {
      runner.run('copy');
    },
  ),
};

export default Task;
