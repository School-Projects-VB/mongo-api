const ArticleModel = require('../models/ArticleModel');
const CommentModel = require('../models/CommentModel');

// Add an article
async function addArticle(req, res) {
    try {
        // Get elements values to insert
        const {title, content, category} = req.body;

        // Create new article with data
        const article = new ArticleModel({
            title,
            content,
            author: req.payload._id,
            category
        })

        // Save article in database
        await article.save();

        res.status(201).json({
            message: 'Article added successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Get all articles
async function getAllArticles(req, res) {
    try {
        const articles = await ArticleModel.find();
        const articlesWithComments = await Promise.all(
            articles.map(
                async (article) => {
                    const comments = await CommentModel.find(
                        {article_id: article._id},
                        {_id: 0, content: 1}
                    );
                    return {...article.toObject(), comments}
                }
            )
        )

        res.status(200).json({
            articles: articlesWithComments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Update article
async function updateArticle(req, res) {
    try {
        const {title, content, category} = req.body;
        const article = await ArticleModel.findById({
            _id: req.params.id,
            author: req.payload._id
        });

        article.title = title;
        article.content = content;
        article.category = category;

        await article.save();

        res.status(200).json({
            message: 'Article updated successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Delete article
async function deleteArticle(req, res) {
    try {
        const article = await ArticleModel.findById({
            _id: req.params.id,
            author: req.payload._id
        });

        await article.deleteOne();

        res.status(200).json({
            message: 'Article deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Get articles by category
async function getArticlesByCategory(req, res) {
    try {
        const articles = await ArticleModel.find({category: req.params.category});

        res.status(200).json({
            articles
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Search article
async function searchArticle(req, res) {
    try {
        const searchTerm = req.query.query;
        const articles = await ArticleModel.find({
            $or: [
                {
                    title: {
                        $regex: new RegExp(searchTerm, 'i')
                    },
                    content: {
                        $regex: new RegExp(searchTerm, 'i')
                    }
                }
            ]
        })

        res.status(200).json({
            articles
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    addArticle,
    getAllArticles,
    updateArticle,
    deleteArticle,
    getArticlesByCategory,
    searchArticle
}