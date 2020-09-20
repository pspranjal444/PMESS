const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MaintenanceSchedule = require('../../model/maintenance-schedule');

// API to create a new maintenance schedule for an equipment
router.post('/', (req, res) => {
    const { equipment_id, mechanicName, mechanic_id, isDelayed, isDue, maintenanceStatus, reason } = req.body;

    const schedule = new MaintenanceSchedule({
        _id: new mongoose.Types.ObjectId(),
        equipment_id: equipment_id,
        mechanicName: mechanicName,
        mechanic_id: mechanic_id,
        isDelayed: isDelayed,
        isDue: isDue,
        maintenanceStatus: maintenanceStatus,
        reason: reason,
        createdDate: Date.now(),
    });

    MaintenanceSchedule.find({ equipment_id: equipment_id }).exec().then(result => {
        if (result.length <= 0) {
            schedule.save().then(() => {
                res.status(200).json({
                    success: true,
                    message: "Maintenance Schedule added to the database successfully"
                });
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Error while adding schedule to the database"
                });
            });
        } else {
            res.status(202).json({
                success: false,
                message: "Schedule already exists in the database"
            });
        }
    })
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

// API to get maintenance schedule for a specific equipment
router.get('/', (req, res) => {
    const { equipment_id } = req.query;

    MaintenanceSchedule.findOne({ equipment_id: equipment_id }).exec()
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

module.exports = router;