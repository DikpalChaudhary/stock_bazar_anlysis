const ChartData = require('../models/chartdata');

// Get price history for a specific symbol
exports.getChartDataBySymbol = async (req, res) => {
    try {
        const { symbol } = req.params;
        const { startDate, endDate } = req.query;

        // Build a query object
        let query = { symbol: symbol.toUpperCase() };

        // Add date range filtering if provided
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const data = await ChartData.find(query).sort({ date: 1 }); // Sort by date ascending

        if (data.length === 0) {
            return res.status(404).json({ message: "No data found for this symbol" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
exports.addChartData = async (req, res) => {
    try {
        // If req.body is an array, it will insert multiple
        const newData = await ChartData.insertMany(req.body);
        res.status(201).json({
            message: "Data seeded successfully!",
            count: newData.length
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};