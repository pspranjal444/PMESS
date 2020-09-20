const mongoose = require('mongoose');

const maintenanceScheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    equipment_id: String,
    mechanicName: String,
    mechanic_id: String,
    isDelayed: Boolean,
    isDue: Boolean,
    maintenanceStatus: String,
    reason: String,
    createdDate: Date,
    maintenanceCompleteDate: Date,
    reviewedBy: String,
    completedBy: String
});

module.exports = mongoose.model('MaintenanceSchedule', maintenanceScheduleSchema);