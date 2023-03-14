const CommentModel = require('../models/CommentModel');

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
        return res.status(400).json({
            message: error.message
        });
    }
}


module.exports = {
    addComment
}