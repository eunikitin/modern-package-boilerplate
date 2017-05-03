import merge        from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import baseConfig   from './webpack.config.base';
import resolveRules from './builder/resolve';
import es6Loader    from './builder/loaders/es6';


export default merge(
    baseConfig,
    {
        output: {
            devtoolModuleFilenameTemplate:         '[absolute-resource-path]',
            devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
        },

        externals: [nodeExternals()],
        devtool: "inline-cheap-module-source-map"
    },
    resolveRules,
    es6Loader
);