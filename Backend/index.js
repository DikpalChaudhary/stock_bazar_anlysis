const express = require('express');
const connectdb = require('./db/connect'); 
// 1. Import your router file (ensure the path matches your folder structure)
const stockRoutes = require('./route/company'); 
const marketRoutes = require('./route/marketRoute');

const app = express();
const port = 3000;

// Connect to Database
connectdb();

// Middleware to parse JSON (essential if you add POST/PUT later)
app.use(express.json());

// 2. Mount the Router
// This means all routes in your router file will now start with /api/stocks
app.use('/api', stockRoutes);
app.use('/api/market', marketRoutes);

app.get('/users', (req, res) => {
  res.send(["ram", "shyam", "hari"]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});