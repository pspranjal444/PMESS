const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MaintenanceSchedule = require('../../model/maintenance-schedule');
const Equipment = require('../../model/equipment-details');

// API to create a new maintenance schedule for an equipment and lock it to particular mechanic
router.post('/lock', (req, res) => {
    const { equipment_id, mechanic_id } = req.body;

    const schedule = new MaintenanceSchedule({
        _id: new mongoose.Types.ObjectId(),
        equipment_id: equipment_id,
        mechanic_id: mechanic_id,
        isDelayed: false,
        isLocked: true,
        maintenanceComplete: false,
    });

    schedule.save().then(() => {
        Equipment.update({equipment_id: equipment_id}, {
            $set: {
                isLocked: true
            }
        }).exec().then(()=>{
            res.status(200).json({
                success: true,
                message: "Equipment locked successfully"
            });
        })   
    }).catch(err => {
        res.status(202).json({
            success: false,
            message: "Equipment could not be locked successfully"
        });
    });
});

// API to edit details of the maintenance schedule
router.patch('/edit', (req, res) => {
    const { equipment_id, mechanicName, mechanic_id, maintenanceStatus, reason, maintenanceCompleteDate, reviewedBy, completedBy } = req.body;

    MaintenanceSchedule.update({ equipment_id: equipment_id }, {
        $set: {
            mechanicName: mechanicName,
            mechanic_id: mechanic_id,
            maintenanceStatus: maintenanceStatus,
            reason: reason,
            maintenanceCompleteDate: maintenanceCompleteDate,
            reviewedBy: reviewedBy,
            completedBy: completedBy
        }
    }).exec().then(() => {
        res.status(200).json({
            success: true,
            message: "Maintenance Schedule successfully updated"
        })
    }).catch(err => {
        res.status(202).json({
            success: false,
            message: "Maintenance Schedule could not be updated successfully"
        })
    })
});

// API to mark maintenance as complete
router.patch('/complete', (req, res) => {
    const { equipment_id, reviewedBy, completedBy } = req.body;

    MaintenanceSchedule.update({ equipment_id: equipment_id }, {
        $set: {
            isDelayed: false,
            isDue: false,
            maintenanceStatus: "COMPLETE",
            maintenanceCompleteDate: Date.now(),
            reviewedBy: reviewedBy,
            completedBy: completedBy
        }
    }).exec().then(() => {
        res.status(200).json({
            success: true,
            message: "Maintenance Schedule updated successfully"
        })
    }).catch(err => {
        res.status(202).json({
            success: false,
            message: "Maintenance Schedule could not be updated successfully"
        })
    })
});

// API to get maintenance schedules for a specific equipment
router.get('/', (req, res) => {
    const { equipment_id } = req.query;

    MaintenanceSchedule.find({ equipment_id: equipment_id }).exec()
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

// API to get maintenance schedules for all equipments
router.get('/all', (req, res) => {

    MaintenanceSchedule.find({}).exec()
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

// API to get maintenance schedule for an ongoing maintenance
router.get('/locked', (req, res) => {
    const { equipment_id } = req.query;

    MaintenanceSchedule.find({ $and: [{ equipment_id: equipment_id }, { maintenanceComplete: false }, { isLocked: true }] }).exec().then(result => {
        res.status(200).json({
            success: true,
            result: result
        })
    }).catch(err => {
        res.status(202).json({
            success: false,
            result: null
        })
    })
})

// API to get locked equipments for a particular mechanic
router.get('/locked/mechanic', (req, res) => {
    const { mechanic_id } = req.query;

    MaintenanceSchedule.find({ $and: [{ mechanic_id: mechanic_id }, { maintenanceComplete: false }, { isLocked: true }] }).exec().then(result => {
        res.status(200).json({
            success: true,
            result: result
        })
    }).catch(err => {
        res.status(202).json({
            success: false,
            result: null
        })
    })
})
module.exports = router;