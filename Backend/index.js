const express = require('express');
const cors = require('cors');
const connectdb = require('./db/connect'); 
// 1. Import your router file (ensure the path matches your folder structure)
const stockRoutes = require('./route/company'); 
const marketRoutes = require('./route/marketRoute');
const chartRoutes = require('./route/chartroute');
const Watchlist = require('./models/Watchlist');
const watchlistRoutes = require('./route/watchlist')
const authRoutes = require('./route/user')
const newsRoutes = require('./route/newsroute')

const app = express();
const port = 3001;

// Connect to Database
connectdb();

// Middleware to parse JSON (essential if you add POST/PUT later)
app.use(express.json());

// Apply CORS middleware BEFORE mounting routes
app.use(cors());

// 2. Mount the Router
// This means all routes in your router file will now start with /api/stocks
app.use('/api', stockRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/charts', chartRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

app.get('/users', (req, res) => {
  res.send(["ram", "shyam", "hari"]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});