var express = require('express');// module import gareko 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { // function vaneko middleware
  res.render('index', { title: 'Purnima' });
});

module.exports = router;
