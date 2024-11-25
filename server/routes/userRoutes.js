const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', userController.getProfile);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout',userController.logout)
module.exports = router;