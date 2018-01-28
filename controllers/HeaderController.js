var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var Header = require('../model/Header');

/*
  Get headers
*/
router.get('/headers', function(req, res) {  
  Header.find({}, function(err, headers){
    if (err) return res.status(500).send('Error finding headers!');
    return res.status(200).json(headers);
  });
});

router.post('/headers', function(req, res) {
  Header.create(req.body, function(err, header) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(header);
  });
});

router.delete('/headers/:id', function(req, res) {
  Header.find({ _id: req.params.id}).removeAsync().then(() =>{
    return res.status(204).end();
  });
});

module.exports = router;