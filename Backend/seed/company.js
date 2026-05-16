const mongoose = require('mongoose');
const Company = require('../models/company'); // Adjust path as needed
const connectdb = require('../db/connect'); // Adjust path as needed

const seedData = [
  {
    symbol: "NICA",
    name: "NIC Asia Bank Limited",
    sector: "Commercial Banks",
    ltp: 450.50,
    change: 5.20,
    percentChange: 1.17,
    marketStats: { marketCap: 65000000000, fiftyTwoWeekHigh: 850, fiftyTwoWeekLow: 410 },
    fundamentals: { eps: 28.50, peRatio: 15.80, bookValue: 210 }
  },
  {
    symbol: "NTC",
    name: "Nepal Doorsanchar Company Limited",
    sector: "Others",
    ltp: 912.00,
    change: -2.00,
    percentChange: -0.22,
    marketStats: { marketCap: 136000000000, fiftyTwoWeekHigh: 1100, fiftyTwoWeekLow: 780 },
    fundamentals: { eps: 48.10, peRatio: 18.96, bookValue: 550 }
  },
  {
    symbol: "HDL",
    name: "Himalayan Distillery Limited",
    sector: "Manufacturing",
    ltp: 2150.00,
    change: 45.00,
    percentChange: 2.14,
    marketStats: { marketCap: 35000000000, fiftyTwoWeekHigh: 4200, fiftyTwoWeekLow: 1900 },
    fundamentals: { eps: 65.40, peRatio: 32.87, bookValue: 310 }
  },
  {
    symbol: "UPPER",
    name: "Upper Tamakoshi Hydropower Ltd",
    sector: "Hydropower",
    ltp: 210.00,
    change: -4.50,
    percentChange: -2.10,
    marketStats: { marketCap: 42000000000, fiftyTwoWeekHigh: 550, fiftyTwoWeekLow: 195 },
    fundamentals: { eps: -2.10, peRatio: 0, bookValue: 98 }
  },
  {
    symbol: "SHL",
    name: "Soaltee Hotel Limited",
    sector: "Hotels",
    ltp: 415.00,
    change: 12.00,
    percentChange: 2.98,
    marketStats: { marketCap: 18000000000, fiftyTwoWeekHigh: 580, fiftyTwoWeekLow: 280 },
    fundamentals: { eps: 12.50, peRatio: 33.20, bookValue: 145 }
  },
  {
    symbol: "NLIC",
    name: "Nepal Life Insurance Co. Ltd.",
    sector: "Life Insurance",
    ltp: 685.00,
    change: 1.00,
    percentChange: 0.15,
    marketStats: { marketCap: 55000000000, fiftyTwoWeekHigh: 950, fiftyTwoWeekLow: 610 },
    fundamentals: { eps: 10.20, peRatio: 67.15, bookValue: 185 }
  },
  {
    symbol: "GBIME",
    name: "Global IME Bank Limited",
    sector: "Commercial Banks",
    ltp: 198.00,
    change: -1.20,
    percentChange: -0.60,
    marketStats: { marketCap: 70000000000, fiftyTwoWeekHigh: 310, fiftyTwoWeekLow: 185 },
    fundamentals: { eps: 18.40, peRatio: 10.76, bookValue: 165 }
  },
  {
    symbol: "CIT",
    name: "Citizen Investment Trust",
    sector: "Others",
    ltp: 2105.00,
    change: 25.00,
    percentChange: 1.20,
    marketStats: { marketCap: 105000000000, fiftyTwoWeekHigh: 3500, fiftyTwoWeekLow: 1950 },
    fundamentals: { eps: 32.10, peRatio: 65.57, bookValue: 240 }
  },
  {
    symbol: "BHL",
    name: "Balephi Hydropower Limited",
    sector: "Hydropower",
    ltp: 285.00,
    change: 25.90,
    percentChange: 9.98,
    marketStats: { marketCap: 4000000000, fiftyTwoWeekHigh: 350, fiftyTwoWeekLow: 150 },
    fundamentals: { eps: 2.50, peRatio: 114.00, bookValue: 102 }
  },
  {
    symbol: "MLBSL",
    name: "Mithila Laghubitta Bittiya Sanstha",
    sector: "Microfinance",
    ltp: 890.00,
    change: -15.00,
    percentChange: -1.66,
    marketStats: { marketCap: 1200000000, fiftyTwoWeekHigh: 1350, fiftyTwoWeekLow: 810 },
    fundamentals: { eps: 22.10, peRatio: 40.27, bookValue: 180 }
  }
  ,
  {
    symbol: "NABIL",
    name: "Nabil Bank Limited",
    sector: "Commercial Banks",
    ltp: 485.20,
    change: 3.40,
    percentChange: 0.70,
    marketStats: { marketCap: 131000000000, fiftyTwoWeekHigh: 650, fiftyTwoWeekLow: 440 },
    fundamentals: { eps: 24.15, peRatio: 20.09, bookValue: 225 }
  },
  {
    symbol: "MNBBL",
    name: "Muktinath Bikas Bank Ltd.",
    sector: "Development Banks",
    ltp: 382.00,
    change: -2.50,
    percentChange: -0.65,
    marketStats: { marketCap: 25000000000, fiftyTwoWeekHigh: 510, fiftyTwoWeekLow: 340 },
    fundamentals: { eps: 19.80, peRatio: 19.29, bookValue: 158 }
  },
  {
    symbol: "NIFRA",
    name: "Nepal Infrastructure Bank Limited",
    sector: "Investment",
    ltp: 212.00,
    change: 0.80,
    percentChange: 0.38,
    marketStats: { marketCap: 45000000000, fiftyTwoWeekHigh: 315, fiftyTwoWeekLow: 188 },
    fundamentals: { eps: 8.40, peRatio: 25.24, bookValue: 114 }
  },
  {
    symbol: "SICL",
    name: "Shikhar Insurance Co. Ltd.",
    sector: "Non-Life Insurance",
    ltp: 815.00,
    change: 14.00,
    percentChange: 1.75,
    marketStats: { marketCap: 21000000000, fiftyTwoWeekHigh: 1150, fiftyTwoWeekLow: 750 },
    fundamentals: { eps: 21.30, peRatio: 38.26, bookValue: 205 }
  },
  {
    symbol: "HIDCL",
    name: "Hydroelectricity Investment and Development Co.",
    sector: "Investment",
    ltp: 168.00,
    change: -1.20,
    percentChange: -0.71,
    marketStats: { marketCap: 38000000000, fiftyTwoWeekHigh: 245, fiftyTwoWeekLow: 152 },
    fundamentals: { eps: 6.20, peRatio: 27.10, bookValue: 108 }
  },
  {
    symbol: "HRL",
    name: "Himalayan Reinsurance Limited",
    sector: "Others",
    ltp: 612.50,
    change: 55.60,
    percentChange: 9.98,
    marketStats: { marketCap: 61000000000, fiftyTwoWeekHigh: 720, fiftyTwoWeekLow: 510 },
    fundamentals: { eps: 14.50, peRatio: 42.24, bookValue: 160 }
  },
  {
    symbol: "API",
    name: "Api Power Company Ltd.",
    sector: "Hydropower",
    ltp: 185.00,
    change: 2.10,
    percentChange: 1.15,
    marketStats: { marketCap: 10000000000, fiftyTwoWeekHigh: 295, fiftyTwoWeekLow: 145 },
    fundamentals: { eps: 4.80, peRatio: 38.54, bookValue: 112 }
  },
  {
    symbol: "CFCL",
    name: "Central Finance Co. Ltd.",
    sector: "Finance",
    ltp: 310.00,
    change: -8.00,
    percentChange: -2.52,
    marketStats: { marketCap: 3000000000, fiftyTwoWeekHigh: 450, fiftyTwoWeekLow: 260 },
    fundamentals: { eps: 11.20, peRatio: 27.68, bookValue: 135 }
  },
  {
    symbol: "ADBL",
    name: "Agricultural Development Bank Limited",
    sector: "Commercial Banks",
    ltp: 245.00,
    change: 0.50,
    percentChange: 0.20,
    marketStats: { marketCap: 48000000000, fiftyTwoWeekHigh: 380, fiftyTwoWeekLow: 220 },
    fundamentals: { eps: 15.60, peRatio: 15.71, bookValue: 218 }
  },
  {
    symbol: "LBBL",
    name: "Lumbini Bikas Bank Ltd.",
    sector: "Development Banks",
    ltp: 362.00,
    change: 4.20,
    percentChange: 1.17,
    marketStats: { marketCap: 12000000000, fiftyTwoWeekHigh: 490, fiftyTwoWeekLow: 315 },
    fundamentals: { eps: 18.10, peRatio: 20.00, bookValue: 162 }
  }
];

const seedDB = async () => {
  try {
    await connectdb();
    // Clear existing data so you don't get duplicates
    await Company.deleteMany({});
    console.log("Old data cleared...");
    
    // Insert new data
    await Company.insertMany(seedData);
    console.log("Database Seeded Successfully!");
    
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();