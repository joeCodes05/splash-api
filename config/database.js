const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if(err) {
    console.log('Could not connect to database', err.sqlMessage);
  } else {
    // create user table
    db.query(`CREATE TABLE IF NOT EXISTS users (
      user_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      fullname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      image VARCHAR(255) NULL
    ) CHARSET utf8mb4 COLLATE = utf8mb4_unicode_ci, ENGINE = InnoDB`); 
    console.log('Conncection to database successfull');
  }
})

module.exports = db;