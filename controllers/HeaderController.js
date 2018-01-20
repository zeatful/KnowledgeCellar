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
  console.log('getting headers');

  Header.find({}, function(err, headers){
    if (err) return res.status(500).send('Error finding headers!');
    console.log(headers);
    return res.send(headers);
  });
});

module.exports = router;