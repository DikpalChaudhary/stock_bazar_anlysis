const News = require('../models/news');

// Get all news (with optional category filter)
exports.getAllNews = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    
    const news = await News.find(filter)
      .sort({ publishedAt: -1 })
      .limit(20);
      
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single news by Slug (SEO friendly)
exports.getNewsBySlug = async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) return res.status(404).json({ message: "News not found" });
    
    // Increment view count
    news.views += 1;
    await news.save();
    
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};