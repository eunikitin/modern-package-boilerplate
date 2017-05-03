
export default {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /(node_modules|test\.js|\.spec\.js$)/
            },
        ]
    },
}