const database = require('../database');

const MainController = {
    findAll: async (request, response) => {
        try {
            const db = await database;
            const users = await db.collection('users').find({}).toArray();
            response.json(users);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
}

module.exports = MainController;