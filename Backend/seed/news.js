const mongoose = require('mongoose');
// CRITICAL: Match your model filename exactly (likely 'News' with capital N)
const News = require('../models/news'); 
const connectdb = require('../db/connect'); 


const newsData = [
  {
    "title": "NEPSE Index Sees Sharp Recovery as Banking Sector Gains Momentum",
    "content": "The Nepal Stock Exchange (NEPSE) witnessed a significant uptick today, gaining 24.5 points to close at 2,045.6. Investors showed high interest in commercial banks following the central bank's latest circular...",
    "summary": "NEPSE gains 24.5 points today led by the banking sector.",
    "category": "Market",
    "tags": ["NEPSE", "Banking", "Bullish"],
    "isBreaking": true
  },
  {
    "title": "Gold Prices Reach All-Time High in Local Market",
    "content": "Gold prices in Nepal reached a record high today, trading at NPR 140,000 per tola. Traders cite international market volatility and currency fluctuations as the primary reasons...",
    "summary": "Gold hits record NPR 140,000 per tola.",
    "category": "Gold/Silver",
    "tags": ["Gold", "Commodity", "Price Update"],
    "isBreaking": false
  },
  {
    "title": "Upcoming IPO: Himalayan Hydropower to Issue 2 Million Shares",
    "content": "Himalayan Hydropower is set to open its Initial Public Offering (IPO) for the general public starting next week. The company aims to raise capital for its 15MW project...",
    "summary": "New IPO opening next week for Himalayan Hydropower.",
    "category": "IPO/FPO",
    "tags": ["IPO", "Hydropower", "Investment"],
    "isBreaking": true
  },
  {
    "title": "NRB Announces New Monetary Policy Review",
    "content": "Nepal Rastra Bank (NRB) has released its quarterly review of the monetary policy, keeping the policy rate unchanged while adjusting risk weights for real estate loans...",
    "summary": "NRB maintains policy rates in recent quarterly review.",
    "category": "Economy",
    "tags": ["NRB", "Monetary Policy", "Economy"],
    "isBreaking": false
  },
  {
    "title": "Commercial Banks Report 15% Increase in Net Profit",
    "content": "Unpublished second-quarter reports show a combined net profit increase of 15% across major commercial banks, driven by higher interest income and cost management...",
    "summary": "Banking sector sees 15% profit growth in Q2.",
    "category": "Banking",
    "tags": ["Earnings", "Banking", "Quarterly Report"],
    "isBreaking": false
  },
  {
    "title": "Nepal's Inflation Drops to 5.2% in April",
    "content": "According to the latest data from the Central Bureau of Statistics, year-on-year inflation has cooled down to 5.2%, providing some relief to consumers...",
    "summary": "Inflation eases to 5.2% as food prices stabilize.",
    "category": "Economy",
    "tags": ["Inflation", "Economy", "CBS"],
    "isBreaking": false
  },
  {
    "title": "Daily Silver Rate Updates: Slight Dip Noted",
    "content": "Silver prices saw a minor correction today, dropping by NPR 10 per tola. The current trading price stands at NPR 1,850...",
    "summary": "Silver prices drop slightly to NPR 1,850.",
    "category": "Gold/Silver",
    "tags": ["Silver", "Commodity"],
    "isBreaking": false
  },
  {
    "title": "Technical Analysis: NEPSE Forms Bullish Engulfing Pattern",
    "content": "On the daily chart, the NEPSE index has formed a bullish engulfing candle, suggesting a potential trend reversal if the volume stays high in the next session...",
    "summary": "Chart patterns suggest a potential bullish reversal for NEPSE.",
    "category": "Market",
    "tags": ["Technical Analysis", "Chart", "NEPSE"],
    "isBreaking": false
  },
  {
    "title": "Federal Reserve Holds Interest Rates Steady",
    "content": "In a move that impacted global markets, the US Federal Reserve decided to keep interest rates steady, citing ongoing efforts to combat inflation...",
    "summary": "US Fed keeps rates unchanged, impacting global sentiment.",
    "category": "International",
    "tags": ["Fed", "Global Market", "Interest Rates"],
    "isBreaking": false
  },
  {
    "title": "NICA Dividends Approved by General Meeting",
    "content": "The Annual General Meeting of NIC Asia Bank has officially approved the proposed dividend for the fiscal year 080/81. Shareholders will receive the bonus shortly...",
    "summary": "NICA shareholders approve dividend proposal.",
    "category": "Banking",
    "tags": ["Dividend", "NICA", "AGM"],
    "isBreaking": true
  }
];

const seedNews = async () => {
  try {
    // Replace the string below with your actual MongoDB URI
    await connectdb();
    
    console.log("Connected to MongoDB for seeding...");
    await News.deleteMany();

    await News.insertMany(newsData);
    
    console.log("✅ Database Seeded Successfully!");
    process.exit(); // Closes the script after finishing
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedNews();