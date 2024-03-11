const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
require('dotenv').config();

const userSchema = new Schema({
    firstname:{
        type: String,
        required: true,
        unique: true,
    },
    lastname:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    verified:{
        type: Boolean,
        default: false,
    }
})

userSchema.method.generateAuthToken =()=>{
    const Token = jwt.sign({_id: this._id},process.env.SECRET,{expiresIn: '3d'});
    return Token;
}

const User = mongoose.model('User', userSchema);

// const validate = (data) =>{
//     const schema = Joi.object({
//         firstname: Joi.String().required().label('First name'),
//         lastname: Joi.String().required().label('Last name'),
//         email: Joi.String().required().email().label('Email'),
//         password: passwordComplexity().required().label('Password')
//     })

//     return schema.validate(data);

// }

module.exports = {
    User,
    // validate
}



