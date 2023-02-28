const { Router } = require('express');

const router = Router();

// MainController
const MainController = require('./controller/MainController');

// Route get
router.get('/users', MainController.findAll);

module.exports = router;