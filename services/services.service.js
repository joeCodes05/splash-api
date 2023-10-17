const database = require("../config/database.config");

module.exports = {
  createNewService: (data, callback) => {
    database.query(
      `INSERT INTO services(service_name, service_desc, service_image) VALUES (?, ?, ?)`,
      [data.service_name, data.service_desc, data.service_image],
      (error, results) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results);
      }
    );
  },

  getAllServices: (callback) => {
    database.query(`SELECT * FROM services`, [], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getServiceName: (serviceName, callback) => {
    database.query(
      `SELECT * WHERE service_name = ?`,
      [serviceName],
      (error, results) => {
        if (error) {
          return callback(error);
        }

        return callback(null, results[0]);
      }
    );
  },
};
