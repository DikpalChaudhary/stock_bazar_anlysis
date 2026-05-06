const { default: mongoose } = require("mongoose");

const chartPriceSchema = new mongoose.Schema({
  symbol: { type: String, required: true, index: true },
  date: { type: Date, required: true },
  open: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  close: { type: Number, required: true },
  volume: { type: Number },
  isAdjustment: { type: Boolean, default: false } // Bonus वा Right share पछि मूल्य समायोजन भएको छ कि छैन
});

const ChartData = mongoose.model('ChartData', chartPriceSchema);
module.exports = ChartData;