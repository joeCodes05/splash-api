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
    // create service table
    database.query(`CREATE TABLE IF NOT EXISTS services(
      service_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      service_name VARCHAR(255) NOT NULL,
      service_desc VARCHAR(255) NOT NULL,
      service_image VARCHAR(255) NOT NULL,
      create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARSET utf8mb4 COLLATE = utf8mb4_unicode_ci, ENGINE = InnoDB`);
    console.log("Connection to database successful");
  }
});

module.exports = database;
