// Dependencies
import * as path     from 'path';

// Core
import * as types    from 'builder/core/types';
import * as paths    from 'builder/core/paths';

// Lib
import * as fs       from 'builder/lib/fs';


const copy = () => async function copy() {
  await fs.makeDir(path.resolve(paths.rootDir(), 'build'));

  const packageJson = path.resolve(paths.packageDir(), 'package.json');
  const packageLock = path.resolve(paths.packageDir(), 'package-lock.json');
  const readme      = path.resolve(paths.rootDir(), 'README.md');
  const license     = path.resolve(paths.rootDir(), 'LICENSE');
  const npmignore   = path.resolve(paths.packageDir(), '.npmignore');

  if (await fs.exists(packageJson)) {
    await fs.copyFile(
      packageJson,
      path.resolve(paths.buildDir(), 'package.json'),
    );
  }

  if (await fs.exists(packageLock)) {
    await fs.copyFile(
      packageLock,
      path.resolve(paths.buildDir(), 'package-lock.json'),
    );
  }

  if (await fs.exists(readme)) {
    await fs.copyFile(
      readme,
      path.resolve(paths.buildDir(), 'README.md'),
    );
  }

  if (await fs.exists(license)) {
    await fs.copyFile(
      license,
      path.resolve(paths.buildDir(), 'LICENSE'),
    );
  }

  if (await fs.exists(npmignore)) {
    await fs.copyFile(
      npmignore,
      path.resolve(paths.buildDir(), '.npmignore'),
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
