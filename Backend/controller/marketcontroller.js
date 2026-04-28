const MarketData = require('../models/marketdata');

// @desc    Update or Insert live market data
// @route   POST /api/market/update
exports.updateLiveMarket = async (req, res) => {
  try {
    const marketArray = req.body; // Expecting an array of stock objects

    if (!Array.isArray(marketArray)) {
      return res.status(400).json({ message: "Data must be an array" });
    }

    const bulkOps = marketArray.map((item) => ({
      updateOne: {
        filter: { symbol: item.symbol },
        update: { $set: { ...item, lastUpdated: new Date() } },
        upsert: true, // Create if it doesn't exist
      },
    }));

    await MarketData.bulkWrite(bulkOps);
    res.status(200).json({ message: "Market data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get all live market data
// @route   GET /api/market
exports.getMarketData = async (req, res) => {
  try {
    // Sorting by symbol or turnover is common for NEPSE
    const data = await MarketData.find().sort({ symbol: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get data for a specific stock
// @route   GET /api/market/:symbol
exports.getStockBySymbol = async (req, res) => {
  try {
    const data = await MarketData.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!data) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};