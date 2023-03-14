const mongoose = require('mongoose');
const mongo_url = `mongodb://${process.env.HOST}/${process.env.DATABASE}`;

mongoose.set('strictQuery', true);

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose