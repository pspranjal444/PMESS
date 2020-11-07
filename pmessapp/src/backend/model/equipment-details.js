const mongoose = require('mongoose');

const equipmentDetailsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    equipment_id: String,
    equipmentName: String,
    serialNo: String,
    maintenanceFrequency: Number,
    needsReview: Boolean,
    isNotInUse: Boolean,
    isBackInUse: Boolean,
    dueDate: Date
});

module.exports = mongoose.model('EquipmentDetails', equipmentDetailsSchema);