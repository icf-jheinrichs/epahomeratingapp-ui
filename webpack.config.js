'use strict';

const path              = require('path');
const precss            = require('precss');
const autoprefixer      = require('autoprefixer');

module.exports = {
    entry    : './client/js/epahomeratingapp.js',
    output   : {
        path       : path.resolve('dist/'),
        publicPath : path.resolve('dist/'),
        filename   : 'bundle.js'
    },
    devtool  : 'sourcemap',
    resolve  : {
        extensions : ['', '.js']
    },
    module   : {
        loaders : [
            {
                test   : /\.css$/,
                loader : 'style-loader!css-loader'
            },
            {
                test    : /\.scss$/,
                include : [
                    path.resolve('client'),
                    path.resolve('common-ui')
                ],
                loader  : 'style-loader!css-loader!postcss-loader!sass-loader'
            },
            {
                test    : /\.js$/,
                exclude : [/app\/lib/, /node_modules/],
                loader  : 'ng-annotate-loader!babel-loader'
            },
            {
                test   : /\.pug$/,
                loader : 'pug-loader?pretty=true'
            },
            {
                test   : /\.html$/,
                loader : 'raw'
            },
            {
                test   : /\.(png|jpg|jpeg|gif|svg)$/,
                loader : 'file&name=./img/[hash].[ext]'
            },
            {
                test   : /\.(svg|woff|woff2|ttf|eot)$/,
                loader : 'url-loader?name=/font/[hash].[ext]'
            },
            // helps to load bootstrap's css.
            {
                test   : /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader : 'url-loader?limit=8192&mimetype=application/font-woff&name=/font/[hash].[ext]'
            },
            {
                test   : /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader : 'url-loader?limit=8192&mimetype=application/font-woff&name=/font/[hash].[ext]'
            },
            {
                test   : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader : 'url-loader?limit=8192&mimetype=application/octet-stream&name=/font/[hash].[ext]'
            },
            {
                test   : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader : 'file?name=/font/[hash].[ext]'
            },
            {
                test   : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader : 'url-loader?limit=8192&mimetype=image/svg+xml&name=/font/[hash].[ext]'
            }
        ]
    },
    postcss : function postCss () {
        return [precss, autoprefixer];
    },
    plugins : []
};
