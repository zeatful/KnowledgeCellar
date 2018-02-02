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
      position: 1,
      title: 'Header 1',
      body: 'header 1 body'      
    }, {
      position: 2,
      title: 'Header 3',
      body: 'header 3 body'
    }, {
      position: 3,
      title: 'Header 4',
      body: 'header 4 body'
    }, {
      position: 4,
      title: 'Header 2',
      body: 'header 2 body'
    })
  });

console.log('Database seeded!');