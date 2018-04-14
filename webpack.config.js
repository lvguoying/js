const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        port: '8081',
        compress: true
    },
    plugins: [
        new ExtractTextPlugin('./css/main.css'),
        new HtmlWebpackPlugin({
            title: "index",
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'

        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: { importLoader: 1 }
                }, 'postcss-loader'],
                publicPath: "../"
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 50,
                    outputPath: 'imgage/'
                }
            }]

        },
        {
            test: /\.(html|htm)$/i,
            loader: 'html-withimg-loader'
        }
        ]
    },
    watchOptinos: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    }
}