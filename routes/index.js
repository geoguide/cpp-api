var express = require('express');
var connection = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/players', function(req, res, next) {
  console.log('get players');
  connection.promise().query('SELECT * from players').then(([results, fields]) => {
    console.log('result', results);
    res.status(200).send(results);
  });

});

module.exports = router;
