const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const EquipmentDetails = require('../../model/equipment-details');
const MaintenanceSchedule = require('../../model/maintenance-schedule');
const RepairLog = require('../../model/repair-log');

// API to create a new equipment entry
router.get('/userActivity', async(req, res) => {
    const mech_id = req.query.mechanic_id
    const start = req.query.start
    const end = req.query.end
    const output = []
    await MaintenanceSchedule.count({$and:[{ maintenanceComplete: true},{mechanic_id: mech_id},{maintenanceCompleteDate:{$gte:start, $lte:end}}]}).exec()
        .then(result => {
            output.push({"PM":result})
        }).then(() => {
             RepairLog.count({$and:[{mechanic_id:mech_id},{isComplete:true},{reviewedDate:{$gte:start, $lte:end}}] }).exec()
            .then(result => {
                output.push({"Repair":result})
            })
            .then(() => {
                MaintenanceSchedule.count({$and:[{ reviewOk: true},{reviewedBy: mech_id},{reviewedDate:{$gte:start, $lte:end}}]}).exec()
                .then(result => {
                        output.push({"Reviews":result})
                        res.status(200).json({
                            success: true,
                            message: "User activity successful",
                            result:output
                        })
                })
                .catch(err => {
                    res.status(202).json({
                        success: false,
                        message: "User activity failed"
                    })
                })
            })
        })


})

module.exports = router;