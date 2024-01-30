const express = require('express');
const router = express.Router();
const {addUser, getUsers, getUserById, updateUser, deleteUser, userAuth} = require('../controllers/user.controller');

router.route('/')
.get(getUsers)
.post(addUser);

router.route('/:id')
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;