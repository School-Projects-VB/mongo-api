const {Schema, model} = require('../../database');

/**
* Entity of user
* @typedef User
* @property {String} email
* @property {String} password
*/
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model('User', UserSchema);

module.exports = User;