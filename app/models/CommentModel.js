const {Schema, model} = require('../../database');

/**
 * Entity of comment
 * @typedef Comment
 * @property {ObjectId} Author
 * @property {ObjectId} Article
 * @property {String} content
 * @property {Date} publish_date
 */
const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publish_date: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;