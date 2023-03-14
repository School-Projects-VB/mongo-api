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

/**
 * Get my comments
 * @route GET /comment/me
 * @summary Response with your comments
 * @group Comment
 * @return {String} 200 - Success
 * @returns {String} 500 - An error message
 */
router.get('/comment/me', checkJwt, CommentController.getMyComments);

/**
 * Edit a comment
 * @route PUT /comment/edit/{id}
 * @summary Response with 'Comment edited successfully'
 * @group Comment
 * @param {Article.model} object.body.required Object containing properties to edit
 * @return {String} 200 - Edited with success
 * @returns {String} 500 - An error message
 */
router.put('/comment/edit/:id', checkJwt, CommentController.editComment);

/**
 * Delete a comment
 * @route DELETE /comment/delete/{id}
 * @summary Response with 'Comment deleted successfully'
 * @group Comment
 * @param {Article.model} object.body.required Object containing properties to delete
 * @return {String} 200 - Deleted with success
 * @returns {String} 500 - An error message
 */
router.delete('/comment/delete/:id', checkJwt, CommentController.deleteComment);

module.exports = router;