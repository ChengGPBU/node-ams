const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '47.110.42.63',
  user: 'root',
  password: '123456',
  database: 'ams'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });