require("dotenv").config();
const mysql = require("mysql");

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database.connect((err) => {
  if (err) {
    console.log(`Error connecting to database`, err);
  } else {
    // create users table
    database.query(`CREATE TABLE IF NOT EXISTS users(
      user_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(255) NOT NULL,
      user_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      profile_image VARCHAR(255) NULL,
      status TINYINT(5) DEFAULT 1,
      token VARCHAR(100) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARSET utf8mb4 COLLATE = utf8mb4_unicode_ci, ENGINE = InnoDB`);

    console.log("Connection to database successful");
  }
});

module.exports = database;
