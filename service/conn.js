var mysql = require("mysql");

var connection = mysql.createConnection({
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PWD || "my-secret-pw",
  database: process.env.DB_NAME || "mydb"
});

// Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;
