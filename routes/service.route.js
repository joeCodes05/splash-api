const { createNewService, getServiceName } = require("../services/services.service");

const router = require("express").Router();

router.post('/', createNewService);
router.get('/:service_name', getServiceName);

module.exports = router;