const express = require('express')
const Router = express.Router();
const { User } = require('../models/user')
const app = express()
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = require('../models/token');
const sendMail = require('../utils/sendemail');
const crypto = require('crypto');


Router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            res.statusCode(400).json({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const validPassword = await bcrypt.compair(res.body.password, user.password);
        if (!validPassword) {
            res.statusCode(400).json({ message: 'Invalid password' });
        }

        if (!user.verified) {
            let token = await token.findOne({ userId: user._id });
            if (!token) {
                token = await new token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save();
                const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
                await sendMail(user.email, 'Account Verification', url);

            }
            return res.statusCode(400).json({ message: 'Account not verified, An Email has been sent to your email address, please verify your account to continue' });
        }



        const token = user.generateAuthToken();
        res.statusCode(200).json({ message: 'Logged in Successfully', token });

    } catch {
        res.statusCode(500).json({ message: 'Internal server error' });
    }

})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.String().required().email().label('Email'),
        password: Joi.String().required().label('Password')
    })
    return schema.validate(data);
}

module.exports = Router;