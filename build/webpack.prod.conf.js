// 存放prod配置
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const path = require('path');
const webpack = require('webpack');
// 清除打包多余文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 分离css,打包到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  output: {
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env')
    }), // 配置请求地址
  ]
})
