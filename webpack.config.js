const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'js/[name].js'
  },
  mode: 'none',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [require.resolve('babel-preset-env'), { modules: false }],
                require.resolve('babel-preset-react')
              ],
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]'
            }
          }
        ]
      }
    ]
  }
};
