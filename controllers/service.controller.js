const database = require("../config/databse.config");
const { createNewService, getServiceName } = require("../services/services.service");

module.exports = {
  createService: (req, res) => {
    const body = req.body;

    createNewService(body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          message: "Database connection error"
        });
      }

      return res.status(200).json({
        error: false,
        data: result
      });
    })
  },

  getServiceByName: (req, res) => {
    const serviceName = req.params.serviceName;
    getServiceName(serviceName, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(400).json({
          error: true,
          message: "Bad request"
        });
      }

      if (!result) {
        return res.status(404).json({
          error: true,
          message: "Service not found"
        });
      }

      return res.status(200).json({
        error: false,
        data: result
      });
    });
  }
}