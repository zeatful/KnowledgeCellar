/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
const Topic = require('./model/Topic');

console.log('Seeding database...');

Topic.find({}).removeAsync()
  .then(() => {
    Topic.create({
      position: 0,
      title: 'Topic 1',
      body: '# This the first topic header \n\nAnd this is a paragraph'      
    }, {
      position: 1,
      title: 'Topic 3',
      body: '# This is the third topic header\n\nAnd this is a paragraph'
    }, {
      position: 2,
      title: 'Topic 4',
      body: '# This is the fourth topic header\n\nAnd this is a paragraph'
    }, {
      position: 3,
      title: 'Topic 2',
      body: '# This is the second topic header\n\nAnd this is a paragraph'
    })
  });

console.log('Database seeded!');