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
      position: 1,
      title: 'Topic 1',
      body: 'Topic 1 body'      
    }, {
      position: 2,
      title: 'Topic 3',
      body: 'Topic 3 body'
    }, {
      position: 3,
      title: 'Topic 4',
      body: 'Topic 4 body'
    }, {
      position: 4,
      title: 'Topic 2',
      body: 'Topic 2 body'
    })
  });

console.log('Database seeded!');