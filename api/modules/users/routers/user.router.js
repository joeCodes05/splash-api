const { createUser, getUserByUserId, getUsers, updateUsers, deleteUser, login } = require("../controllers/user.controller");
const router = require('express').Router();
const { checkToken } = require('../../../../auth/token.validation');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserByUserId);
router.patch('/', checkToken, updateUsers);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', login);

module.exports = router;