const db = require('../../../../config/database');

module.exports = {
  create: (data, callback) => {
    db.query(`INSERT INTO users(fullname, email, password, image) VALUES (?, ?, ?, ?)`, [
      data.fullname,
      data.email,
      data.password,
      data.image
    ], (error, results, fields) => {
      if(error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getUsers: callback => {
    db.query(`SELECT user_id, fullname, email, image FROM users`, [], (error, result, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, result);
    })
  },

  getUserByUserId: (id, callback) => {
    db.query(`SELECT user_id, fullname, email, image FROM users WHERE user_id = ?`, [id], (error, result, fields) => {
      if(error) {
        return callback(error);
      }
      return callback(null, result[0]);
    })
  },

  updateUsers: (data, callback) => {
    db.query(`UPDATE users SET fullname=?, email=?, password=?, image=? WHERE user_id =?`, [
      data.fullname,
      data.email,
      data.password,
      data.image,
      data.user_id
    ], (error, result, fields) => {
      if(error) {
        return callback(error);
      }
      return callback(null, result[0]);
    })
  },

  deleteUser: (data, callback) => {
    db.query(`DELETE FROM users WHERE user_id = ?`, [data.id], (error, result, fields) => {
      if(error) {
        return callback(error);
      }
      return callback(null, result[0]);
    })
  }
}