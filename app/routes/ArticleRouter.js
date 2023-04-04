const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/ArticleController');
const checkJwt = require('../../middlewares/checkJwt');
const {cache, flush} = require('../../middlewares/cache');

/**
 * Add one article
 * @route POST /article
 * @summary Response with "Article added successfully"
 * @group Article
 * @param {Article.model} object.body.required Object containing properties to insert
 * @return {String} 200 - Added with success
 * @returns {String} 500 - An error message
 */
router.post('/article', checkJwt, flush, ArticleController.addArticle);

/**
 * Get all articles
 * @route GET /article
 * @summary Response with all articles
 * @group Article
 * @return {String} 200 - Success
 * @returns {String} 500 - An error message
 */
router.get('/article', cache, ArticleController.getAllArticles);

/**
 * Update article
 * @route PUT /article/{id}
 * @summary Response with 'Article updated successfully'
 * @group Article
 * @param {Article.model} object.body.required Object containing properties to update
 * @return {String} 200 - Updated with success
 * @returns {String} 500 - An error message
 */
router.put('/article/:id', checkJwt, flush, ArticleController.updateArticle);

/**
 * Delete article
 * @route DELETE /article/{id}
 * @summary Response with 'Article deleted successfully'
 * @group Article
 * @param {Article.model} object.body.required Object containing properties to delete
 * @return {String} 200 - Deleted with success
 * @returns {String} 500 - An error message
 */
router.delete('/article/:id', checkJwt, flush, ArticleController.deleteArticle);

/**
 * Get all articles by category
 * @route GET /article/{category}
 * @summary Response with articles of a category
 * @group Article
 * @return {String} 200 - Success
 * @returns {String} 500 - An error message
 */
router.get('/article/:category', ArticleController.getArticlesByCategory);

/**
 * Search article
 * @route GET /search/article
 * @summary Response with articles matches with query
 * @group Article
 * @return {String} 200 - Success
 * @returns {String} 500 - An error message
 */
router.get('/search/article', ArticleController.searchArticle);

module.exports = router;