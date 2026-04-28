const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// 1. GET ALL STOCKS (Market Watch)
// Returns a list of all stocks with basic LTP and % Change
router.get('/market-watch', async (req, res) => {
    try {
        const stocks = await Company.find({}, 'symbol name sector ltp percentChange change volume');
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. GET SINGLE STOCK DETAIL (Company Profile)
// Example: /api/stocks/NICA
router.get('/stock/:symbol', async (req, res) => {
    try {
        const stock = await Company.findOne({ symbol: req.params.symbol.toUpperCase() });
        if (!stock) return res.status(404).json({ message: "Stock not found" });
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. GET SECTOR-WISE DATA
// Example: /api/stocks/sector/Hydropower
router.get('/sector/:sectorName', async (req, res) => {
    try {
        const stocks = await Company.find({ sector: req.params.sectorName });
        res.status(200).json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. TOP GAINERS (Limit to top 5)
router.get('/top-gainers', async (req, res) => {
    try {
        const gainers = await Company.find().sort({ percentChange: -1 }).limit(5);
        res.status(200).json(gainers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;