const { createUser, getUserByUserId, getUsers, updateUsers, deleteUser } = require("../controllers/user.controller");
const router = require('express').Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByUserId);
router.patch('/', updateUsers);
router.delete('/:id', deleteUser);

module.exports = router;