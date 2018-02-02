'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

module.exports = mongoose.model('Header', new Schema({
  position: {type: Number, index: true},
  title: {type: String, index: true},
  body: String
}));