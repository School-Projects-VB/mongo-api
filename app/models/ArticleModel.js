const {Schema, model} = require('../../database');

/**
 * Entity of article
 * @typedef Article
 * @property {String} title
 * @property {String} content
 * @property {ObjectId} author
 * @property {Date} publish_date
 * @property {String} category
 */
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        enum: ["sport", "tech", "health"]
    }
})

const Article = model('Article', ArticleSchema);

module.exports = Article;