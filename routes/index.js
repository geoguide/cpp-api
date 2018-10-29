var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const result = {
    hello: true
  }
  res.status(200).send(result);
});

module.exports = router;
