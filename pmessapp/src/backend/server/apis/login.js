const UserDetails = require('../../model/user-details');
const express = require('express');
const router = express.Router();
const voca = require('voca');

router.get('/', (req, res) => {
    const user_id = req.query.user_id;
    const password = req.query.password;
    const role = req.query.role;

    console.log(req.query);
    if (voca.isEmpty(user_id) || voca.isEmpty(password) || voca.isEmpty(role)) {
        console.log("One or more of the fields is empty");
        res.status(202).json({
            message: "Unable to search for the user"
        });
        return;
    }

    UserDetails.find({user_id: user_id, password: password, role: role}).exec()
            .then(result => {
                if(result.length > 0) {
                    console.log("User Exists");
                    res.status(200).json({
                        userFound: true,
                        message: "User Exists"
                    });
                }
                
                else {
                    console.log("User does not exist");
                    res.status(202). json({
                        userFound: false,
                        message: "User does not exist"
                    })
                }
            })
});

module.exports = router;