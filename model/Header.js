'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

module.exports = mongoose.model('Header', new Schema({
  text: String
}));