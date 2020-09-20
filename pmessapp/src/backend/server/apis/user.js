const express = require('express');
const router = express.Router();
const UserDetails = require('../../model/user-details');
const voca = require('voca');
const mongoose = require('mongoose');

// API to create a new user
router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const role = req.body.role;

    if (voca.isEmpty(user_id) || voca.isEmpty(password) || voca.isEmpty(role)) {
        console.log("One or more of the fields is empty");
        res.status(202).json({
            success: true,
            message: "Unable to create user"
        });
        return;
    }

    const user = new UserDetails({
        _id: new mongoose.Types.ObjectId(),
        user_id: user_id,
        password: password,
        role: role
    });

    user.save().then(result => {
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).json({
            success: true,
            message: "User created successfully"
        });
    }).catch(err => {
        res.status(202).json({
            success: false,
            message: "User could not be created successfully"
        });
    });
});

// API to login a user
router.get('/', (req, res) => {
    const user_id = req.query.user_id;
    const password = req.query.password;
    const role = req.query.role;

    if (voca.isEmpty(user_id) || voca.isEmpty(password) || voca.isEmpty(role)) {
        res.status(202).json({
            success: false,
            message: "Unable to search for the user"
        });
        return;
    }

    UserDetails.find({ user_id: user_id, password: password, role: role }).exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "User Exists"
                });
            }

            else {
                res.status(202).json({
                    success: false,
                    message: "User does not exist"
                })
            }
        })
});

module.exports = router;
