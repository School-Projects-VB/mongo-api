const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const checkJwt = require('../../middlewares/checkJwt');

/**
 * Signin route
 * @route POST /signin
 * @summary Response with signin success
 * @group User
 * @param {User.model} object.body.required Object containing properties to insert
 * @return {String} 200 - Signin success
 * @returns {String} 500 - An error message
 */
router.post('/signin', UserController.signIn)

/**
 * Login route
 * @route POST /login
 * @summary Response with login success
 * @group User
 * @param {User.model} object.body.required Object containing properties to insert
 * @return {String} 200 - Login success
 * @returns {String} 500 - An error message
 */
router.post('/login', UserController.logIn)

/**
 * Logout route
 * @route POST /logout
 * @summary Response with logout success
 * @group User
 * @return {String} 200 - Logout success
 * @returns {String} 500 - An error message
 */
router.get('/logout', checkJwt, UserController.logOut)

module.exports = router;