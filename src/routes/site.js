const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/chat', siteController.chat);
router.get('/', siteController.index);

module.exports = router;
