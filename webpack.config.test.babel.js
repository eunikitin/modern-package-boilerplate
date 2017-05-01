import merge        from 'webpack-merge';

import baseConfig   from './webpack.config.base';
import resolveRules from './builder/resolve';
import es6Loader    from './builder/loaders/es6';


export default merge(
    baseConfig,
    resolveRules,
    es6Loader
);