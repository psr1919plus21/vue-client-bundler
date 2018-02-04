const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    index: './src/app/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/static/js/'),
    filename: '[name].js'
  },
  watch: NODE_ENV === 'development' ? true : false,
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : false,

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
             scss: 'vue-style-loader!css-loader!sass-loader',
             js: 'babel-loader!eslint-loader'
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  plugins: []
};


if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      drop_console: true,
      unsafe: true
    })
  );
}
