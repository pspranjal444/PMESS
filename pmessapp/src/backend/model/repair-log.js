const mongoose = require('mongoose');

const repairLogschema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    equipment_id: String,
    problem: String,
    correctiveAction: String,
    followUp: String,
    part: String,
    timeSpent: Number,
    mechanic_id: String,
    reviewedBy: String,
    reviewedTime: Date,
    createdDate: Date,
    severity: String
});

module.exports = mongoose.model('RepairLog', repairLogschema);