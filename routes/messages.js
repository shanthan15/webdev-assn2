const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');
const router = express.Router();

router.post('/', auth, requireRole('patient'), sendMessage);
router.get('/', auth, getMessages);

module.exports = router;
