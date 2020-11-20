const mongoose = require('mongoose');

const userDetailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    phone: String,
    email_id: String
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);