const CommentModel = require('../models/CommentModel');

// Get my comments
async function getMyComments(req, res) {
    try {
        const comments = await CommentModel.find({
            author: req.payload._id
        });

        return res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Add comment
async function addComment(req, res) {
    try {
        const { content } = req.body;
        const comment = new CommentModel({
            author: req.payload._id,
            article_id: req.params.id,
            content: content
        });

        await comment.save();

        return res.status(201).json({
            message: 'Comment added successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Edit comment
async function editComment(req, res) {
    try {
        const { content } = req.body;
        const comment = await CommentModel.findById({
            _id: req.params.id,
            author: req.payload._id
        });

        comment.content = content;

        await comment.save();

        return res.status(200).json({
            message: 'Comment edited successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Delete comment
async function deleteComment(req, res) {
    try {
        const comment = await CommentModel.findById({
            _id: req.params.id,
            author: req.payload._id
        });

        await comment.deleteOne();

        return res.status(200).json({
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    getMyComments,
    addComment,
    editComment,
    deleteComment
}