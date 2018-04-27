/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const isDeveloping = process.env.NODE_ENV !== 'production';
const ip = process.env.IP ? process.env.IP : 'localhost';
const port = isDeveloping ? 3000 : process.env.PORT;
const seedDB = isDeveloping ? true : process.env.seedDB;

// Add openshift URI
const mongoUri = isDeveloping ? "mongodb://localhost" : "mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${ip}:${port}/${process.env.MONGODB_DATABASE}";

const app = express();

// attempt to connect to mongodb otherwise throw an error
mongoose.connect(mongoUri, {useMongoClient: true}, (err) => {
  if (err) throw err;
});

// grab and set secret from config files
//app.set('supersecret', process.env.secret);

// Populate database with sample data
if (seedDB) {  
  require('./seed');
}

// START CONTROLLER DEFINITIONS
var TopicController = require('./controllers/TopicController');
app.use('/api', TopicController);
// END CONTROLLER DEFINITIONS

// logic for rendering react from backend server with webpack middleware
if (isDeveloping) {
  console.log('Setting up webpack middleware...');
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
  console.log('Webpack setup finished!');
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, ip, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://%s:%s/ in your browser.', port, ip, port);
});
