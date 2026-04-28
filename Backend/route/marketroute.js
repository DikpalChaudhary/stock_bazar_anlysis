const express = require('express');
const router = express.Router();
const { 
  updateLiveMarket, 
  getMarketData, 
  getStockBySymbol 
} = require('../controller/Marketcontroller');

// Standard routes
router.get('/', getMarketData);
router.get('/:symbol', getStockBySymbol);

// Admin or Scraper route to push data
router.post('/update', updateLiveMarket);

module.exports = router;