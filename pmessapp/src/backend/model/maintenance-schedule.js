const mongoose = require('mongoose');

const maintenanceScheduleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    equipment_id: String,
    mechanicName: String,
    mechanic_id: String,
    isDelayed: Boolean,
    remarks: String,
    maintenanceCompleteDate: Date,
    maintenanceComplete: Boolean,
    isLocked: Boolean,
    reviewedBy: String,
    reviewedDate: Date,
    reviewRemarks: String,
    reviewOk: Boolean,
    reviewDelayed: Boolean
});

module.exports = mongoose.model('MaintenanceSchedule', maintenanceScheduleSchema);