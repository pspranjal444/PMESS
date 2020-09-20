const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const RepairLog = require('../../model/repair-log');

// API to create a new repair log entry
router.post('/', (req, res) => {
    const { equipment_id, problem, correctiveAction, followUp, part, mechanic_id, severity } = req.body;

    const log = new RepairLog({
        _id: new mongoose.Types.ObjectId(),
        equipment_id: equipment_id,
        problem: problem,
        correctiveAction: correctiveAction,
        followUp: followUp,
        part: part,
        mechanic_id: mechanic_id,
        createdDate: Date.now(),
        severity: severity
    });

    log.save().then(() => {
        res.status(200).json({
            success: true,
            message: "Repair Log Successfully created"
        })
    }).catch(err => {
        res.status(202).json({
            success: false,
            message: "Error adding repair log to the database"
        })
    })
});

// API to mark repair as complete
router.patch('/complete', (req, res) => {
    const { _id, timeSpent, reviewedBy } = req.body;

    RepairLog.update({ _id: _id }, { $set: { timeSpent: timeSpent, reviewedBy: reviewedBy, reviewedTime: Date.now() } })
        .exec().then(() => {
            res.status(200).json({
                success: true,
                message: "Repair Log successfully updated"
            });
        }).catch(err => {
            res.status(202).json({
                success: false,
                message: "Repair Log could not be successfully updated"
            });
        });
});

// API to get a specific repair log
router.get('/', (req, res) => {
    const { _id } = req.query;

    RepairLog.findOne({ _id: _id }).exec()
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

// API to get all repair logs
router.get('/all', (req, res) => {

    RepairLog.find({}).exec()
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