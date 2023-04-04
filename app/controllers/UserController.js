const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const {hashPassword, comparePassword} = require('../../services/auth');

// Register
async function signIn(req, res) {
    try {
        // Get email and password entries
        const {email, password} = req.body;

        // Check if user exists
        const existUser = await UserModel.findOne({email});
        if (existUser) {
            return res.status(400).json({
                message: "User already exist"
            })
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Insert to database
        const NewUser = new UserModel({
            email,
            password: hashedPassword
        });

        await NewUser.save();

        // Return success message
        res.json({
            message: "Signin success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Login
async function logIn(req, res) {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if (!user) return res.status(400).send("Wrong email");
        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).send("wrong password");
        const token = jwt.sign(
            {user},
            process.env.SECRET,
            {
                expiresIn: '3600s',
                algorithm: 'HS256'
            }
        )
        res.setHeader('Authorization', token)
        res.json({
            message: "Login success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// Logout
async function logOut(req, res) {
    try {
        req.payload.exp = Math.floor(Date.now()/1000) - (60*60);
        const token = jwt.sign(req.payload, process.env.SECRET, {algorithm: 'HS256'});

        res.setHeader('Authorization', token);
        req.payload = undefined;
        res.json({
            message: 'Signout success'
        })
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    signIn,
    logIn,
    logOut
}