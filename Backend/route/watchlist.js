const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');

// 1. CREATE Watchlist
router.post('/', async (req, res) => {
    try {
        const newList = await Watchlist.create(req.body);
        res.status(201).json(newList);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET ALL Watchlists
router.get('/', async (req, res) => {
    try {
        const lists = await Watchlist.find().populate('stocks');
        res.json(lists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. ADD STOCK TO LIST
router.put('/:id/add', async (req, res) => {
    try {
        const updated = await Watchlist.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { stocks: req.body.stockId } },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. DELETE Watchlist
router.delete('/:id', async (req, res) => {
    try {
        await Watchlist.findByIdAndDelete(req.params.id);
        res.json({ message: "Watchlist Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;