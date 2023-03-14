const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/CommentController');
const checkJwt = require('../../middlewares/checkJwt');

/**
 * Add a comment
 * @route POST /comment/:id
 * @summary Response with 'Comment added successfully'
 * @group Comment
 * @param {Article.model} object.body.required Object containing properties to add
 * @return {String} 200 - Added with success
 * @returns {String} 500 - An error message
 */
router.post('/comment/:id', checkJwt, CommentController.addComment);

module.exports = router;