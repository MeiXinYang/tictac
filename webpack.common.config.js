const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const resolve = (dir) => path.join(__dirname, dir);
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry: {
        main: resolve("./src/index.js")
    },
    output: {
        path: resolve('dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: [".js",".json"],
        alias: {
            "@":path.join("_dirname","src")
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader'
                },

            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    {
                        loader: "css-loader",
                    }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: ["html-withimg-loader"]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }

        ]
    },
    externals:{
        'BMap':'BMap',
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: resolve('dist/index.html'), // 生成的html文件存放的地址和文件名
            template: resolve("index.html"), // 基于index.html模板进行生成html文件
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
    ],
}