const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordcheck = require('../middleware/password');

router.post('/signup', passwordcheck, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;