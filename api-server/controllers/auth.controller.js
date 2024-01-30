require('dotenv/config');
// const express = require('express');
const User = require('../models/user.model');
const {JSONResponse} = require('../lib/json.helper')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Authenticate a User
exports.userAuth = async (req, res, next) => {
    let {email, password} = req.body
    let existingUser;
    let token;

    try {
        existingUser = await User.findOne({email: email})
    } catch {
        const error = new Error('Error finding User.')
    }

    if(!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
        const error = Error("Invalid Login Credentials.");
        return next(error);
    }

    try{
        token = jwt.sign(
            JSON.stringify({existingUser}), 
            process.env.ACCESS_TOKEN_SECRET,
            // {expiresIn: '7d'}
        );
    }  catch(err) {
        const error = new Error('Error generating token.');
        console.log(error);
        return next(err);
    }

    
    existingUser = existingUser.toObject();
    console.log('existing user: ', existingUser);

    JSONResponse.success(res, `Login successful...\n Welcome ${existingUser.fName}`, {...existingUser, token}, 200);

}