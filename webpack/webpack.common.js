const path = require('path')

const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname, '../')
const { main, version } = require(path.resolve(ROOT_PATH, './package.json'))
const NODE_ENV = process.env.NODE_ENV
const ENV_TYPE = process.env.ENV_TYPE

const isProd = NODE_ENV === 'production'

module.exports = {
  entry: path.resolve(ROOT_PATH, main),
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.join(ROOT_PATH, 'src'),
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: path.resolve(ROOT_PATH, 'node_modules'),
      use: [
        // 'thread-loader',
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          }
        }
      ]
    },
    {
      test: /\.jsx?$/,
      exclude: path.resolve(ROOT_PATH, 'node_modules'),
      use: ['thread-loader', 'babel-loader']
    },
    {
      test: /\.scss$/,
      exclude: [path.resolve(ROOT_PATH, 'node_modules')],
      use: ['thread-loader', 'style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(png|jpg|gif|webp|ico|svg)$/,
      use: [
        'thread-loader',
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: isProd ? 'static/media/[name].[hash:8].[ext]' : 'media/[name].[ext]',
          }
        }
      ]
    },
    {
      test: /\.(eot|ttf|woff|woff2|otf|mp3)$/,
      use: [
        'thread-loader',
        {
          loader: 'file-loader',
          options: {
            name: isProd ? 'static/fonts/[name].[hash:8].[ext]' : 'fonts/[name].[ext]',
          },
        }
      ]
    }]
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
        'ENV_TYPE': JSON.stringify(ENV_TYPE),
        'APP_VERSION': JSON.stringify(version)
      }
    }),
    new LodashModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      filename: 'index.html',
      template: path.resolve(ROOT_PATH, './template/index.html'),
      inject: true
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('../dll/react-manifest.json'),
    })
  ],
}