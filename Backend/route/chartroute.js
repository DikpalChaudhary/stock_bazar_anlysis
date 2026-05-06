const express = require('express');
const router = express.Router();
const chartController = require('../controller/chartcontroller');

// GET /api/charts/AAPL?startDate=2023-01-01
router.get('/:symbol', chartController.getChartDataBySymbol);
router.post('/', chartController.addChartData);

module.exports = router;