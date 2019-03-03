const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { defaults: tsjPreset }     = require('ts-jest/presets');

// Configs
const { compilerOptions }         = require('./tsconfig');


module.exports = {
  "rootDir": "./",
  transform: {
    ...tsjPreset.transform,
  },

  globals: {
    'ts-jest': {
      tsConfig: './internals/builder/configs/tsconfig.builder.json'
    }
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
