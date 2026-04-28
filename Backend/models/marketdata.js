// यो डेटा दिनभरि परिवर्तन भइरहन्छ। नेप्सेको "Live Market" पेजमा देखिने कुराहरू यसमा पर्छन्।
const mongoose = require('mongoose');
const marketDataSchema = new mongoose.Schema({
  stockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
  symbol: { type: String, required: true },
  lastTradedPrice: { type: Number, required: true },
  change: { type: Number }, // Price Change (+/-)
  percentChange: { type: Number },
  open: Number,
  high: Number,
  low: Number,
  volume: Number, // कति कित्ता कारोबार भयो
  turnover: Number, // कति रुपैयाँको कारोबार भयो
  lastUpdated: { type: Date, default: Date.now }
});
module.exports = mongoose.model('MarketData', marketDataSchema);