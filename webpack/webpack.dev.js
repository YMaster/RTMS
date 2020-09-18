const path = require('path')

const webpack = require('webpack')
const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common')
const ROOT_PATH = path.resolve(__dirname, '../')

module.exports = merge(commonConfig, {
  output: {
    path: path.resolve(ROOT_PATH, 'dist/'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.less$/,
      exclude: [path.resolve(ROOT_PATH, 'node_modules')],
      use: ['thread-loader', 'style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.css$/,
      use: ['thread-loader', 'style-loader', 'css-loader']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  cache: {
    type: 'filesystem'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, `./dist`),
    publicPath: `/`,
    port: 2333,
    host: '0.0.0.0',
    open: true,
    useLocalIp: true,
    historyApiFallback: true,
  },
})
