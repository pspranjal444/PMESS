const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const EquipmentDetails = require('../../model/equipment-details');

// API to create a new equipment entry
router.post('/', (req, res) => {
    const { equipment_id, equipmentName, serialNo, maintenanceFrequency } = req.body.data;

    var todaysDateISO = new Date();

    if (maintenanceFrequency == 0) {
        todaysDateISO.setDate(todaysDateISO.getDate() + 7);
    } else if (maintenanceFrequency == 1) {
        todaysDateISO.setDate(todaysDateISO.getDate() + 30);
    } else if (maintenanceFrequency == 2) {
        todaysDateISO.setDate(todaysDateISO.getDate() + 365);
    }

    const equipment = new EquipmentDetails({
        _id: new mongoose.Types.ObjectId(),
        equipment_id: equipment_id,
        equipmentName: equipmentName,
        serialNo: serialNo,
        maintenanceFrequency: maintenanceFrequency,
        needsReview: false,
        isNotInUse: false,
        isBackInUse: true,
        dueDate: todaysDateISO.toLocaleDateString('en-US'),
        isLocked: false,
        maintenanceDone: false
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

//API to get all the over-due equipment maintenanceschedules
router.get('/overdue', (req, res) => {

    var todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString('en-US');

    EquipmentDetails.find({$and:[{ maintenanceDone: false },{ dueDate: {$lt: new Date(todaysDate)} }] }).exec()
        .then(result => {
             console.log("Overdue: ",result);
            res.status(200).json({
                success: true,
                result: result
            })
        })
});

// API to get all upcoming equipments that need to be serviced within the upcoming week
router.get('/weekly', (req, res) => {
    var todaysDatePlusSeven = new Date();
    todaysDatePlusSeven.setDate(todaysDatePlusSeven.getDate() + 7);
    todaysDatePlusSeven = todaysDatePlusSeven.toLocaleDateString('en-US');

    var todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString('en-US');

    EquipmentDetails.find({ dueDate: { $gte: new Date(todaysDate), $lte: new Date(todaysDatePlusSeven) } }).exec()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                success: true,
                result: result
            })
        })
});

// API to get all upcoming equipments that need to be serviced within the upcoming month 
router.get('/monthly', (req, res) => {
    var todaysDatePlusThirty = new Date();
    todaysDatePlusThirty.setDate(todaysDatePlusThirty.getDate() + 30);
    todaysDatePlusThirty = todaysDatePlusThirty.toLocaleDateString('en-US');

    var todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString('en-US');

    EquipmentDetails.find({ dueDate: { $gte: new Date(todaysDate), $lte: new Date(todaysDatePlusThirty) } }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                success: true,
                result: result
            })
        })
});

// API to get all upcoming equipments that need to be serviced within the upcoming annually
router.get('/annually', (req, res) => {
    var todaysDatePlusYear = new Date();
    todaysDatePlusYear.setDate(todaysDatePlusYear.getDate() + 365);
    todaysDatePlusYear = todaysDatePlusYear.toLocaleDateString('en-US');

    var todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString('en-US');

    EquipmentDetails.find({ dueDate: { $gte: new Date(todaysDate), $lte: new Date(todaysDatePlusYear) } }).exec()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                success: true,
                result: result
            })
        })
});

// API to get all upcoming equipments that need to be serviced within date range
router.get('/daterange', (req, res) => {
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;

    console.log(req.query)

    EquipmentDetails.find({ dueDate: { $gte: new Date(startDate), $lte: new Date(endDate) } }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                success: true,
                result: result
            })
        })
});

// API to get all upcoming equipments that need to be serviced today
router.get('/today', (req, res) => {
    var todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString('en-US');

    EquipmentDetails.find({ dueDate: new Date(todaysDate) }).exec()
        .then(result => {
            // console.log(result);
            res.status(200).json({
                success: true,
                result: result
            })
        })
});

// router.get('/countDueToday',  (req, res) => {
//     var todaysDate = new Date();
//     todaysDate = todaysDate.toLocaleDateString('en-US');

//     EquipmentDetails.count({dueDate: new Date(todaysDate)
// }).exec()
//     .then(result => {
//         console.log("due today" ,result);
//         res.status(200).json({
//             success: true,
//             result: result
//         })
//     })

// });

// router.get('/countOverdue', (req, res) => {

//     var todaysDate = new Date();
//     todaysDate = todaysDate.toLocaleDateString('en-US');

//     EquipmentDetails.count({ $and: [{ maintenanceDone: false }, { dueDate: { $lt: new Date(todaysDate) } }] }).exec()
//         .then(result1 => {
//             console.log("overdue" ,result);
//             res.status(200).json({
//                 success: true,
//                 result1: result1
//             })
//         })
// });

// API to mark equipment back in use as true or false
router.patch('/backinuse', (req, res) => {
    const { equipment_id, isBackInUse } = req.body;

    EquipmentDetails.update({ equipment_id: equipment_id },
        {
            $set: {
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

// API to mark equipment that it needs review
router.patch('/needsreview', (req, res) => {
    const { equipment_id, needsReview } = req.body;

    EquipmentDetails.update({ equipment_id: equipment_id },
        {
            $set: {
                needsReview: needsReview
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

// API to unlock an equipment
router.patch('/unlock', (req, res) => {
    EquipmentDetails.update({ equipment_id: req.body.equipment.equipment_id },
        {
            $set: {
                isLocked: false
            }
        }).exec().then(result => {
            res.status(200).json({
                success: true,
                message: "Successful"
            })
        }).catch(err => {
            res.status(202).json({
                success: false,
                message: "Unsuccessful"
            })
        })
})

// API to update due date
router.patch('/updateduedate', (req, res) => {
    var newDueDate = new Date();
    EquipmentDetails.findOne({equipment_id: req.body.equipment.equipment_id}).exec().then(result => {
        const maintenanceFrequency = result.maintenanceFrequency;
        if (maintenanceFrequency == 0) {
            newDueDate.setDate(newDueDate.getDate() + 7)
            console.log('Date', newDueDate);
        } else if (maintenanceFrequency == 1) {
            newDueDate.setDate(newDueDate.getDate() + 30)
        } else if (maintenanceFrequency == 2) {
            newDueDate.setDate(newDueDate.getDate() + 365)
        }
        newDueDate = newDueDate.toLocaleDateString('en-US');
        EquipmentDetails.updateOne({ equipment_id: req.body.equipment.equipment_id },
            {
                $set: {
                    dueDate: newDueDate
                }
            }).exec().then(result => {
                res.status(200).json({
                    success: true,
                    message: "Successful"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Unsuccessful"
                })
            })
    })

    
})

module.exports = router;