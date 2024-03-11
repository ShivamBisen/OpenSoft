const express = require('express')
const Router = express.Router();
const { User } = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();
const { Token } = require('../models/token');
const sendMail = require('../utils/sendemail');


Router.post('/', async (req, res) => {
    try {
        // console.log("something happend")

        // const { error } = validate(req.body)
        // if (error) {
        //     console.log(error);
        //     return res.status(400).json({ message: error.details[0].message })
        // }

        console.log("trying to create the user")

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: 'User already exist' })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashed = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashed
        })

        user = await newUser.save();

        // console.log(user);

        // const token = await new Token({
        //     userId: user._id,
        //     token: crypto.randomBytes(32).toString('hex')
        // }).save();

        // console.log("hello 2");

        // const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
        const mail = `
        Here is your verification link: 
        http://localhost:3000/users/${user._id}/verify/soepmthign
        `
        await sendMail("something@gmail.com", user.email, 'Account Verification', mail);

        res.status(200).send({ message: ' An Email has been sent to your email address, please verify your account to continue' })


    } catch(error) {    
        return res.status(500).send({ message: 'Internal server error' })
    }
})

Router.get('/:id/verify/:token', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        const token = await token.findOne({ userId: user._id, token: req.params.token });
        if (!token) {
            return res.status(400).json({ message: 'Invalid or expired token' })
        }
        await User.updateOne({ _id: user._id }, { verified: true });
        await token.remove();
        res.status(200).json({ message: 'Account verified successfully' })
    } catch {
        res.status(500).json({ message: 'Internal server error' })
    }
});



module.exports = Router;
