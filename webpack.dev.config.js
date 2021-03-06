const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const webpack = require("webpack");
module.exports = merge(common, {
    devServer: {
        host: 'localhost',
        port: 8088,
        open: true,
        hot: true, //模块热替换
        historyApiFallback: {
            index: '/',
        },
    },
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()//模块热替换
    ],

})