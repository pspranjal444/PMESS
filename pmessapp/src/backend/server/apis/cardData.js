const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const RepairLog = require('../../model/repair-log');
const EquipmentDetails = require('../../model/equipment-details');


 router.get('/cardDetails', async (req, res) => {
    var cardOutput = [];
    var todaysDate = new Date();
    todaysDate = todaysDate.toLocaleDateString('en-US');

    await EquipmentDetails.count({
        dueDate: new Date(todaysDate)
    }).exec()
        .then(result => {
            console.log("due today", result);
            cardOutput.push(result);
        })

    await EquipmentDetails.count({ $and: [{ maintenanceDone: false }, { dueDate: { $lt: new Date(todaysDate) } }] }).exec()
        .then(result => {
            console.log("overdue", result);
            cardOutput.push(result);
        })

    await RepairLog.count({ isComplete: false }).exec()
        .then(result => {
            console.log("repair Count", result);
           
            cardOutput.push(result);
            console.log("Card Details: ", cardOutput);
            res.status(200).json({
                message: "Card Details sent",
                success: true,
                result: cardOutput

            });
        })
        
   
// router.get('/countOverdue', (req, res) => {

//     var todaysDate = new Date();
//     todaysDate = todaysDate.toLocaleDateString('en-US');

//     EquipmentDetails.count({ $and: [{ maintenanceDone: false }, { dueDate: { $lt: new Date(todaysDate) } }] }).exec()
//         .then(result1 => {
//             console.log("overdue", result);
//             res.status(200).json({
//                 success: true,
//                 result1: result1
//             })
//         })
// });
// router.get('/getRepairCount', (req, res) => {

//     RepairLog.count({ isComplete: false }).exec()
//         .then(result2 => {
//             console.log("repair Count", result);
//             res.status(200).json({
//                 success: true,
//                 result2: result2,
//                 message: "Maintenance Schedules found"
//             })
//         }).catch(err => {
//             res.status(202).json({
//                 success: false,
//                 message: "Maintenance Schedules not found"
//             })
//         });

 })
module.exports = router;