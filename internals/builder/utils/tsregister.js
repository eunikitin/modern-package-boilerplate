// Dependencies
const path     = require('path');

// Config
const tsconfig = require('../configs/tsconfig.builder');


require('ts-node').register({
  project: 'internal/builder/configs/tsconfig.builder.json',
  extensions: [ '.ts', '.tsx' ]
});

require('tsconfig-paths').register({
  baseUrl: path.resolve(__dirname, '../'),
  paths: {"builder/*":  ["/*"], "root/*": ["../../*"] }
});
