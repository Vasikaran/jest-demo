const express = require('express');
const { hostname } = require('os');
const devMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');

const mockApi = require('./mockapi');

const config = require('./webpack.config');

let args = process.argv.slice(2);
let port = args[0] || 9090;
let compiler = webpack(config);
let app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  devMiddleware(compiler, {
    logLevel: 'info',
    publicPath: '/app/'
  })
);

mockApi(app);

app.use('/app', express.static('app'));

app.listen(port, err => {
  if (err) {
    throw err;
  }
  console.log(`Listening at http://${hostname()}:${port}/app`);
});
