require('dotenv/config');
// const express = require('express');
const User = require('../models/user.model');
const {JSONResponse} = require('../lib/json.helper')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Add A User
exports.addUser = async(req, res) => {
    try{
        const {fName, lName, email, password} = req.body;
        const passHash = bcrypt.hashSync(password, 10);
        const newBody = {fName, lName, email, password: passHash};

        const newUser = await User.create(newBody);

        JSONResponse.success(res, "User created successfully.", newUser, 201);
    } catch (error) {
        JSONResponse.error(res, "Error creating User.", error, 500);
    }
}

//Get all Users
exports.getUsers = async (req, res) => {
    try {
        const users =  await User.find();
        JSONResponse.success(res, "Users successfully retreived.", users, 200);
    } catch (error) {
        JSONResponse.error(res, "Error fetching users.", error, 500);
    }
}

//Get a User By ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.id});
        JSONResponse.success(res, "User Successfully Retreived", user, 200);
    } catch {
        JSONResponse.error(res, "Error fetching User.", error, 500);
    }
}

//Update a User
exports.updateUser = async (req, res) => {
    try{
        const {fName, lName, email, password} = req.body;
        const passHash = bcrypt.hashSync(password, 10);
        const newBody = {fName, lName, email, password: passHash};

        const user = await User.findByIdAndUpdate({_id: req.params.id}, newBody);
        JSONResponse.success(
            res,
            "User updated successfully.",
            { user, new: req.body },
            200
          );
    } catch {
        JSONResponse.error(res, "Error updating User", error, 500);
    }
}

//Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove({_id: req.params.id});
        JSONResponse.success(res, "User deleted successfully.", user, 204);
    } catch {
        JSONResponse.error(res, "Error deleting User", error, 500);
    }
}

