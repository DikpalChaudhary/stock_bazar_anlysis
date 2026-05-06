const Watchlist = require('../models/Watchlist');

// @desc    Create a new watchlist
// @route   POST /api/watchlists
exports.createWatchlist = async (req, res) => {
    try {
        const { name, isPrimary } = req.body;
        // user id comes from your auth middleware (req.user.id)
        const watchlist = await Watchlist.create({
            user: req.user.id,
            name,
            isPrimary
        });
        res.status(201).json({ success: true, data: watchlist });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Watchlist with this name already exists." });
        }
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get all watchlists for a user
// @route   GET /api/watchlists
exports.getWatchlists = async (req, res) => {
    try {
        const watchlists = await Watchlist.find({ user: req.user.id }).populate('stocks');
        res.status(200).json({ success: true, data: watchlists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Add a stock to a specific watchlist
// @route   PATCH /api/watchlists/:id/add
exports.addStockToWatchlist = async (req, res) => {
    try {
        const { stockId } = req.body;
        const watchlist = await Watchlist.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $addToSet: { stocks: stockId } }, // $addToSet prevents duplicate stock IDs in the array
            { new: true }
        );
        
        if (!watchlist) return res.status(404).json({ message: "Watchlist not found" });
        res.status(200).json({ success: true, data: watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Remove a stock from watchlist
// @route   PATCH /api/watchlists/:id/remove
exports.removeStockFromWatchlist = async (req, res) => {
    try {
        const { stockId } = req.body;
        const watchlist = await Watchlist.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $pull: { stocks: stockId } },
            { new: true }
        );
        res.status(200).json({ success: true, data: watchlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a watchlist
// @route   DELETE /api/watchlists/:id
exports.deleteWatchlist = async (req, res) => {
    try {
        await Watchlist.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.status(200).json({ success: true, message: "Watchlist deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};