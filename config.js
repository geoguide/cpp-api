var mysql = require('mysql2');

var connection = mysql.createConnection({
  host     : 'oregon-rds-v2.cisvwj5ieidh.us-west-2.rds.amazonaws.com',
  user     : 'geoguide',
  password : 'wearesnackbrigade',
  database : 'cbb'
});

module.exports = connection;
