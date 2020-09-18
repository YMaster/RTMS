const webpack = require('webpack');
const path = require('path');

const library = '[name]_[chunkhash]';
module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '[name].[contenthash].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dll/[name]-manifest.json'),
      // same with library name in output
      name: library,
      context: __dirname
    }),
  ]
};
