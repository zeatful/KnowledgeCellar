const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Topic = require('../model/Topic');
const ObjectId = require('mongodb').ObjectID;

/*
  Get topics
*/
router.get('/topics', function(req, res) {  
  Topic.find({}, function(err, topics){
    topics.sort((a, b) => a.position > b.position);
    if (err) {
      console.log(err);
      return res.status(500).send('Error finding topics!');
    }
    return res.status(200).json(topics);
  });
});

/*
  Create or Update topic
*/
router.post('/topics', function(req, res) {
  /* findOneAndUpdate does not create id if not passed to query since null 
    is perfectly valid, so we need to use the ternary statement to create a new ID in
    a case where no id is supplied
  */
  const query = req.body.id ? { _id: req.body.id } : {_id: new ObjectId()}
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  Topic.findOneAndUpdate(query, req.body, options, function(err, topic) {
    if(err) { 
      console.log(err)
      return res.status(500).send('Error creating or updating topic!')
    }
    return res.status(201).json(topic)
  });
});

/* 
  Delete topic
*/
router.delete('/topics/:id', function(req, res) {
  Topic.find({ _id: req.params.id}).removeAsync().then(() =>{
    return res.status(204).end();
  });
});

module.exports = router;