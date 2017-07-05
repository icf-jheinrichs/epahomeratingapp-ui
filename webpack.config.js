'use strict';

const path              = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv            = require('dotenv-webpack');

module.exports = {
    entry    : './client/js/epahomeratingapp.js',
    output   : {
        path       : path.resolve('dist/'),
        publicPath : path.resolve('dist/'),
        filename   : 'bundle.js'
    },
    devtool  : 'sourcemap',
    resolve  : {
        extensions : ['.js']
    },
    module   : {
        rules : [
            {
                test   : /\.css$/,
                use    : [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test    : /\.scss$/,
                include : [
                    path.resolve('client'),
                    path.resolve('common-ui')
                ],
                use : [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test    : /\.js$/,
                exclude : [/app\/lib/, /node_modules/],
                use     : [
                    'ng-annotate-loader',
                    'babel-loader'
                ]
            },
            {
                test   : /\.pug$/,
                use    : 'pug-loader?pretty=true'
            },
            {
                test   : /\.html$/,
                use    : 'raw-loader'
            },
            {
                test   : /\.(png|jpg|jpeg|gif|svg)$/,
                use    : 'file-loader?name=./img/[hash].[ext]'
            },
            {
                test   : /\.(svg|woff|woff2|ttf|eot)$/,
                use    : 'file-loader?name=/font/[name].[hash].[ext]'
            },
            // helps to load bootstrap's css.
            {
                test   : /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use    : 'file-loader?limit=8192&mimetype=application/font-woff&name=/font/[name].[hash].[ext]'
            },
            {
                test   : /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use    : 'file-loader?limit=8192&mimetype=application/font-woff&name=/font/[name].[hash].[ext]'
            },
            {
                test   : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use    : 'file-loader?limit=8192&mimetype=application/octet-stream&name=/font/[name].[hash].[ext]'
            },
            {
                test   : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use    : 'file-loader?name=/font/[name].[hash].[ext]'
            },
            {
                test   : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use    : 'file-loader?limit=8192&mimetype=image/svg+xml&name=/font/[name].[hash].[ext]'
            },
            {
                test   : /pdfkit|png-js|fontkit|linebreak|unicode-properties|brotli/,
                loader : 'transform-loader?brfs'
            },
            {
                test   : /\.json$/,
                loader : 'json-loader'
            }
        ]
    },
    plugins : [
        new CopyWebpackPlugin([
            {
                from : 'client/img',
                to   : 'img'
            },
            {
                from : 'client/favicon.ico'
            }
        ]),
        new Dotenv()
    ]
};
