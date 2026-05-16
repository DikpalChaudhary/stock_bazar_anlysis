const express = require('express');
const router = express.Router();
const newsController = require('../controller/newscontroller');
// Route: GET /api/news?category=Economy
router.get('/', newsController.getAllNews);

// Route: GET /api/news/gold-price-hits-new-high
router.get('/:slug', newsController.getNewsBySlug);

module.exports = router;