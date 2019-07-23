// 存放dev和prod配置
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 第三方库单独打包
const AutoDllPlugin = require('autodll-webpack-plugin');
// 分离css,打包到单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname + '/src/'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // 解决vender后面的hash每次都改变
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'element-ui']
      }
    }), //单独打包第三方库
    new VueLoaderPlugin(), // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
    new webpack.optimize.SplitChunksPlugin() // 提取公共代码
  ],
  resolve: {
    extensions: ['.js', '.css', '.vue'],// 省去后缀
    alias: {
        'vue$': 'vue/dist/vue.esm.js', //配置别名 确保webpack可以找到.vue文件
        "@": path.resolve(__dirname, '../src'),
        "components": path.resolve(__dirname, '../src/components'),
        "utils": path.resolve(__dirname + '../src/utils')
    },
    modules: ['node_modules']
  }
}
