const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  sector: {
    type: String,
    required: true,
    enum: [
      'Commercial Banks', 'Development Banks', 'Finance', 'Hotels', 
      'Hydropower', 'Life Insurance', 'Non-Life Insurance', 'Microfinance', 
      'Manufacturing', 'Others', 'Investment'
    ]
  },
  // Real-time / Last Traded Price
  ltp: {
    type: Number,
    default: 0
  },
  change: {
    type: Number, // Point change
    default: 0
  },
  percentChange: {
    type: Number, // % change
    default: 0
  },
  // Market Stats (NEPSE Alpha style)
  marketStats: {
    marketCap: Number,
    paidUpCapital: Number,
    fiftyTwoWeekHigh: Number,
    fiftyTwoWeekLow: Number,
    volume: Number,
    totalTradedShares: Number
  },
  // Fundamental Indicators
  fundamentals: {
    eps: Number,      // Earnings Per Share
    peRatio: Number,  // P/E Ratio
    bookValue: Number,
    pbv: Number,      // Price to Book Value
    dividendYield: Number,
    roe: Number       // Return on Equity
  },
  listingDate: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true // Automatically creates 'createdAt' and 'updatedAt'
});

module.exports = mongoose.model('Company', companySchema);