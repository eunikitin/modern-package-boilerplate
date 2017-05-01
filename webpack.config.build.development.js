import merge        from 'webpack-merge';

import baseConfig   from './webpack.config.build.base';


export default merge(
    baseConfig,
    {
        output: {
            filename: "index.js",
        }
    },
);