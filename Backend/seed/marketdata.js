// const mongoose = require('mongoose');
// const Stock = require('./models/Stock'); // तपाईंको पाथ अनुसार मिलाउनुहोस्
// const MarketData = require('../models/MarketData');

// // MongoDB Connection (तपाईंको URL राख्नुहोस्)
// const DB_URL = "mongodb://localhost:27017/nepse_platform";

// mongoose.connect(DB_URL)
//   .then(() => console.log("DB Connected for Seeding..."))
//   .catch(err => console.log(err));

// const stocks = [
//   {
//     symbol: "NICA",
//     companyName: "NIC Asia Bank Limited",
//     sector: "Commercial Banks",
//     fundamentals: { eps: 32.5, peRatio: 18.2, marketCap: 120000000000 }
//   },
//   {
//     symbol: "NTC",
//     companyName: "Nepal Telecom",
//     sector: "Others",
//     fundamentals: { eps: 45.1, peRatio: 22.5, marketCap: 150000000000 }
//   },
//   {
//     symbol: "UPPER",
//     companyName: "Upper Tamakoshi Hydropower",
//     sector: "Hydropower",
//     fundamentals: { eps: -2.5, peRatio: 0, marketCap: 80000000000 }
//   }
// ];

// const seedDB = async () => {
//   try {
//     // पुरानो डेटा हटाउने
//     await Stock.deleteMany({});
//     await MarketData.deleteMany({});

//     // नयाँ स्टकहरू थप्ने
//     const createdStocks = await Stock.insertMany(stocks);
//     console.log("Stocks Seeded!");

//     // MarketData मा केही नमुना लाइभ डेटा थप्ने
//     const marketEntries = createdStocks.map(stock => ({
//       stockId: stock._id,
//       symbol: stock.symbol,
//       lastTradedPrice: Math.floor(Math.random() * 1000) + 100,
//       change: (Math.random() * 10 - 5).toFixed(2),
//       percentChange: (Math.random() * 2 - 1).toFixed(2),
//       volume: Math.floor(Math.random() * 50000)
//     }));

//     await MarketData.insertMany(marketEntries);
//     console.log("Market Data Seeded!");

//     mongoose.connection.close();
//   } catch (err) {
//     console.log(err);
//   }
// };

// seedDB();