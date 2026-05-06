const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  // कुन प्रयोगकर्ताको वाचलिस्ट हो?
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // छिटो सर्च गर्नका लागि
  },
  // वाचलिस्टको नाम (उदा: "My Favorites" वा "Banking Stocks")
  name: {
    type: String,
    default: "Default Watchlist",
    trim: true
  },
  // स्टकहरूको सूची (Array of Stock IDs)
  stocks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock'
  }],
  // के यो वाचलिस्ट मुख्य हो?
  isPrimary: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// एउटै प्रयोगकर्ताले एउटै नामको दुइटा वाचलिस्ट बनाउन नसकोस् भनेर
watchlistSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);