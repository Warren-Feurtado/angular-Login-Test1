const express = require('express');
const router = express.Router();
const {userAuth} = require('../controllers/auth.controller');

router.route('/auth').post(userAuth);

module.exports = router;