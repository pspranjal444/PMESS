const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const EquipmentDetails = require('../../model/equipment-details');

// API to create a new equipment entry
router.post('/', (req, res) => {
    const { equipment_id, equipmentName, serialNo, maintenanceFrequency, needsReview, isNotInUse, isBackInUse } = req.body;

    const equipment = new EquipmentDetails({
        _id: new mongoose.Types.ObjectId(),
        equipment_id: equipment_id,
        equipmentName: equipmentName,
        serialNo: serialNo,
        maintenanceFrequency: maintenanceFrequency,
        needsReview: needsReview,
        isNotInUse: isNotInUse,
        isBackInUse: isBackInUse
    });

    EquipmentDetails.find({ equipment_id: equipment_id }).exec().then(result => {
        if (result.length > 0) {
            res.status(202).json({
                success: false,
                message: "Equipment already exists"
            })
        }

        else {
            equipment.save().then(result => {
                res.status(200).json({
                    success: true,
                    message: "Equipment added to the database successfully"
                })
            })
        }
    })
});

// API to get details for a specific equipment
router.get('/', (req, res) => {
    const { equipment_id } = req.query;

    EquipmentDetails.findOne({ equipment_id: equipment_id }).exec()
        .then(result => {
            res.status(200).json({
                success: true,
                result: result,
                message: "Maintenance Schedule found"
            })
        }).catch(err => {
            res.status(202).json({
                success: false,
                message: "Maintenance Schedule not found"
            })
        });
});

// API to get details for all equipments
router.get('/all', (req, res) => {

    EquipmentDetails.find({}).exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                success: true,
                result: result,
                message: "Maintenance Schedules found"
            })
        }).catch(err => {
            res.status(202).json({
                success: false,
                message: "Maintenance Schedules not found"
            })
        });
})

// API to edit equipment details
router.patch('/edit', (req, res) => {
    const { equipment_id, equipmentName, serialNo, maintenanceFrequency, needsReview, isNotInUse, isBackInUse } = req.body;

    EquipmentDetails.update({ equipment_id: equipment_id },
        {
            $set: {
                equipmentName: equipmentName,
                serialNo: serialNo,
                maintenanceFrequency: maintenanceFrequency,
                needsReview: needsReview,
                isNotInUse: isNotInUse,
                isBackInUse: isBackInUse
            }
        })
        .exec().then(result => {
            res.status(200).json({
                success: true,
                message: "Equipment Details successfully updated"
            })
        }).catch(err => {
            res.status(202).json({
                success: false,
                message: "Equipment Details could not be updated successfully"
            })
        });
});

module.exports = router;