/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const Header = require('./model/Header');

console.log('Seeding database...');

Header.find({}).removeAsync()
  .then(() => {
    Header.create({
      text: 'Header 1'
    }, {
      text: 'Header 2'
    }, {
      text: 'Header 3'
    }, {
      text: 'Header 4'
    })
  });

console.log('Database seeded!');