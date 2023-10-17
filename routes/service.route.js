const {
  createNewService,
  getServiceName,
  getAllServices,
} = require("../controllers/service.controller");

const router = require("express").Router();

router.post("/", createNewService);
router.get("/", getAllServices);
router.get("/:service_name", getServiceName);

module.exports = router;
