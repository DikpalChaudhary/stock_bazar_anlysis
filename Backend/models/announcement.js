const announcementSchema = new mongoose.Schema({
  companySymbol: { type: String, required: true }, // e.g., "NICA"
  companyName: { type: String },
  title: { type: String, required: true }, // e.g., "Dividend Announcement of NICA"
  type: { 
    type: String, 
    enum: ['Dividend', 'AGM', 'Right Share', 'Bonus Share', 'Financial Report', 'Quarterly Report'],
    required: true
  },
  fiscalYear: { type: String }, // e.g., "080/81"
  fileUrl: { type: String }, // Link to the official PDF notice
  source: { type: String, default: 'NEPSE' },
  publishedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', announcementSchema);