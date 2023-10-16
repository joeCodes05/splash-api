const database = require('../config/databse.config');

module.exports = {
  createNewService: (data, callback) => {
    database.query(`INSERT INTO servcies(service_name, service_desc, service_image) VALUES (?, ?, ?)`, [data.service_name, data.service_desc, data.service_image], (err, results) => {
      if(err) {
        return callback(err);
      }

      return callback(null, results);
    });
  },

  getServiceName: (serviceName, callback) => {
    database.query(`SELECT * WHERE service_name = ?`, [serviceName], (err, results) => {
      if(err) {
        return callback(err);
      }

      return callback(null, results[0]);
    });
  }
}