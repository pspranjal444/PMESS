const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MaintenanceSchedule = require('../../model/maintenance-schedule');
const Equipment = require('../../model/equipment-details');

const isDelayedPM = (equipment) => {
    // console.log("EQUIPMENT due date: ",equipment.dueDate);        
    const dateDiff = Math.abs(Math.abs((new Date() - equipment.dueDate))/(1000 * 60 * 60 * 24));
    console.log("Difference: ",dateDiff);
    if(dateDiff > 2 && equipment.maintenanceFrequency === 0){       //"PM Delayed (weekly)"
        return true;
    } else if(dateDiff > 7 && equipment.maintenanceFrequency === 1){        //"PM Delayed (monthly)"
        return true;
    }
    else if(dateDiff > 28 && equipment.maintenanceFrequency === 2){     //"PM Delayed (yearly)"
        return true;
    }
    else if(new Date() === equipment.dueDate){       //"on time"
        return false;
    }
}

//Is Review delayed
const isDelayedReview = (maintenanceCompleteDate) => {
    console.log("Maintenance date: ",maintenanceCompleteDate)
    const dateDiff = Math.abs(Math.abs((new Date() - maintenanceCompleteDate))/(1000 * 60 * 60 * 24)); 
    console.log("Date Diff: ",dateDiff)   
    return dateDiff > 7 ? true : false;

}

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
        Equipment.update({ equipment_id: equipment_id }, {
            $set: {
                isLocked: true
            }
        }).exec().then(() => {
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

//API to mark delayed PM completion
router.patch('/delayedpm',(req,res) => {
    console.log("IN DELAYED PMMMMMMMM")
    const { maintenance_id, eq_id } = req.body;
    //To calculate if the maintenance is delayed -> completed after the overdue date
    var isDelayed = "";

    Equipment.find({equipment_id:eq_id}).exec()
    .then(result => {
        isDelayed = isDelayedPM(result[0]);
        console.log("PM is delayed: ",isDelayed)
    }).then(() => {
        MaintenanceSchedule.update({ _id: maintenance_id }, {
            $set: {
                isDelayed: isDelayed
            }
        }).exec().then(() => {
            Equipment.update({ equipment_id: eq_id }, {
                $set: {
                    maintenanceDone: true
                }
            }).exec().then(() => {
                res.status(200).json({
                    success: true,
                    message: "Maintenance Schedule and equipment updated successfully"
                })
            })
            
        }).catch(err => {
            res.status(202).json({
                success: false,
                message: "Maintenance Schedule could not be updated successfully"
            })
        })
    })
})

// API to mark maintenance as complete
router.patch('/complete', (req, res) => {
    
    const { maintenance_id} = req.body;
    MaintenanceSchedule.update({ _id: maintenance_id }, {
        $set: {
            maintenanceComplete: true,
            maintenanceCompleteDate: Date.now(),
            isLocked: false,
            reviewOk: false
        }
    }).exec().then(() => {
            res.status(200).json({
                success: true,
                message: "Maintenance Schedule and equipment updated successfully"
            })
        })
        .catch(err => {
        res.status(202).json({
            success: false,
            message: "Maintenance Schedule could not be updated successfully"
        })
    })    
});

// API to mark this maintenance schedule for review
router.patch('/review', (req, res) => {

    const { maintenance_id, reviewRemarks, reviewedBy, reviewOk } = req.body.data;
    //is review deyaled
    MaintenanceSchedule.find({ _id: maintenance_id }).exec()
        .then(result => {
            console.log("REEEEEEEE: ",result)
            const maintenanceCompleteDate = result[0].maintenanceCompleteDate;
            const isReviewDelayed = isDelayedReview(maintenanceCompleteDate)
            console.log("REVIEWW DELAYEDDD: ",isReviewDelayed)
            MaintenanceSchedule.update({ _id: maintenance_id }, {
                $set: {
                    reviewRemarks: reviewRemarks,
                    reviewedBy: reviewedBy,
                    reviewedDate: Date.now(),
                    reviewOk: reviewOk,
                    reviewDelayed: isReviewDelayed
                }
            }).exec().then(() => {
                res.status(200).json({
                    success: true,
                    message: "Maintenance Schedule updated successfully"
                })
            })
        })
        .catch(err => {
            res.status(202).json({
                success: false,
                message: "Maintenance Schedule could not be updated successfully"
            })
        })
});

// API to get details for maintenance schedules that have not been reviewed
router.get('/notreviewed', (req, res) => {

    MaintenanceSchedule.find({ reviewOk: false }).exec()
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

// API to get maintenance schedules for all equipments which have not been reviewed
router.get('/all/incomplete', (req, res) => {

    MaintenanceSchedule.find({ maintenanceComplete: false }).exec()
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

// API to get maintenance schedules for all equipments which have been reviewed
router.get('/all/complete', (req, res) => {

    MaintenanceSchedule.find({ maintenanceComplete: true }).exec()
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

// API to get maintenance schedules for equipments completed within a given week
router.get('/all/complete/withinweek', (req, res) => {
    var todaysDateMinusSeven = new Date();
    todaysDateMinusSeven.setDate(todaysDateMinusSeven.getDate() - 7);
    todaysDateMinusSeven = todaysDateMinusSeven.toLocaleDateString('en-US');

    var todaysDate = new Date();
    todaysDate.setDate(todaysDate.getDate() + 1);
    todaysDate = todaysDate.toLocaleDateString('en-US');

    MaintenanceSchedule.find({$and: [{ maintenanceComplete: true }, {maintenanceCompleteDate: {$gte: new Date(todaysDateMinusSeven), $lte: new Date(todaysDate)}}]}).exec()
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