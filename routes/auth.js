const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    // Check if user is already created
    const emailExists = await User.findOne({email: req.body.email});
    const usernameExists = await User.findOne({name: req.body.name});
    if (emailExists || usernameExists) {
        return res.status(400).send("User name or email already exists") // Email in use -> easy string to set the appropiate toast in the app
    }
    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        // Save user
        const savedUser = await user.save();
        // Generate token
        // Gen token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SEED);
        // Send auth token
        res.send(token);
        // TODO Maybe send an email?
    } catch(err){
        // Catch error
        res.status(400).send(err);
    }
});

// Log in 
router.post('/login', async (req, res) => {
    // Check if email exists
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Wrong email or password")
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Wrong email or password")
    // Gen token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SEED);
    // Send the auth token
    res.send(token)
})

module.exports = router