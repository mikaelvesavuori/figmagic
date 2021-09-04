const path = require('path');
const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = {
  mode: 'production',
  entry: './index.ts',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  optimization: {
    minimize: true
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)/,
        loader: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: [path.resolve(__dirname, 'node_modules')]
      }
    ]
  },
  plugins: [new ShebangPlugin()]
};
