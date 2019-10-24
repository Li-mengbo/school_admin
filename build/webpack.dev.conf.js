// 存放dev配置
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.conf');
const path = require('path');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'vue-style-loader',
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
            loader: 'vue-style-loader',
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), //告诉服务其从哪提供内容
    hot: true,
    open: true,
    port: 8889,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 开启热更新
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }), // 配置请求地址
  ]
})
