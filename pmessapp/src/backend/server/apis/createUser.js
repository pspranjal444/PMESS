const express = require('express');
const router = express.Router();
const UserDetails = require('../../model/user-details');
const voca = require('voca');
const mongoose = require('mongoose');

router.post('/', (req, res) => {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const role = req.body.role;
    console.log(req.body);
    console.log(user_id);
    console.log(password);
    console.log(role);

    if(voca.isEmpty(user_id) || voca.isEmpty(password) || voca.isEmpty(role)) {
        console.log("One or more of the fields is empty");
        res.status(202).json({
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
        console.log("User created successfully", result);
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).json({
            result: result,
            message: "User created successfully"
        });
    }).catch(err => {
        console.log("User could not be created successfully", err);
        res.status(202).json({
            result: err,
            message: "User could not be created successfully"
        });
    });
});

module.exports = router;
