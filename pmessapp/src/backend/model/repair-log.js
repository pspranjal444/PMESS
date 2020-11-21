const mongoose = require('mongoose');

const repairLogschema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    maintenance_id: String,
    equipment_id: String,
    problem: String,
    correctiveAction: String,
    part: String,
    mechanic_id: String,
    mechanicName: String,
    reviewedDate: Date,
    severity: String,
    isComplete: Boolean
});

module.exports = mongoose.model('RepairLog', repairLogschema);