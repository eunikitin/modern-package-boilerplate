# Boilerplate for creating npm packages with ES6 
[![Build Status](https://travis-ci.org/eunikitin/npm-package-es6-boilerplate.svg?branch=master)](https://travis-ci.org/eunikitin/npm-package-es6-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/eunikitin/npm-package-es6-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/eunikitin/npm-package-es6-boilerplate?branch=master)
[![dependencies Status](https://david-dm.org/eunikitin/npm-package-es6-boilerplate/status.svg)](https://david-dm.org/eunikitin/npm-package-es6-boilerplate)
[![devDependencies Status](https://david-dm.org/eunikitin/npm-package-es6-boilerplate/dev-status.svg)](https://david-dm.org/eunikitin/npm-package-es6-boilerplate?type=dev)

## Features
* Build with [webpack 2](https://webpack.js.org/) and [babel](https://babeljs.io/)
* Test with [mocha](https://mochajs.org/), [chai](http://chaijs.com/) and [sinon](http://sinonjs.org/)
* Cover with [istanbul](https://github.com/gotwarlost/istanbul)
* Lint with [eslint](http://eslint.org/) ([air-bnb config](https://github.com/airbnb/javascript))
* CI with [travis-ci.org](https://travis-ci.org/)
* Coverage info with [coveralls.io](https://coveralls.io)

## Getting started
1. [Clone this repo from github](https://github.com/eunikitin/npm-package-es6-boilerplate)
2. Inside repo directory run `npm install && rm -r .git && git init`
2. Update package.json with your information

## Usage
### Commands

#### `npm run clean`
Delete all cache and output files

#### `npm run dev`
Build your library in development mode

#### `npm run build`
Build your library in production mode

#### `npm run test`
Run tests

#### `npm run test:watch`
Run tests in watch mode

#### `npm run cover`
Cover your code (Work with ES6)

#### `npm run coveralls`
Sends coverage details to [coveralls.io](https://coveralls.io).
Used in .travis.yml and should not be used manually.

#### `npm run lint`
Check your code for errors and code styles

#### `npm run prepublish`
Hook for npm, that executes when you publishing package in npm repository.

### Lint
This boilerplate uses
[air-bnb code style conventions](https://github.com/airbnb/javascript#table-of-contents),
however if you don't like it, you can disable it, by removing the following line in 
`.eslintrc` config file:
```js
{
  //...
  
  "extends": "airbnb"
}
```

### Webpack aliases
If you are as tired as me to write '../../../' in the
require statements, you can use
[alias feature provided by webpack](https://webpack.js.org/configuration/resolve/#resolve-alias).
Here is an example of aliases, built in this boilerplate
by default (`builder/resolve.js`):
```js
resolve: {
    alias: {
        Src: path.resolve(process.cwd() + '/src'),
        Lib: path.resolve(process.cwd() + '/lib')
    }
}
```
Feel free to add your custom aliases, they are awesome.