var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var Topic = require('../model/Topic');

/*
  Get topics
*/
router.get('/topics', function(req, res) {  
  Topic.find({}, function(err, topics){
    topics.sort((a, b) => a.position > b.position);
    if (err) return res.status(500).send('Error finding topics!');
    return res.status(200).json(topics);
  });
});


/*
  Create or Update topic
*/
router.post('/topics', function(req, res) {
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  console.log('Attempting to post: ', req.body);
  Topic.findOneAndUpdate({id: req.body.id}, req.body, options, function(err, topic) {
    if(err) { return res.status(500).send('Error creating or updating topic!')};
    return res.status(201).json(topic);
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