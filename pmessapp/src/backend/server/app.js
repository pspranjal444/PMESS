const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createUser = require('./apis/createUser');
const login = require('./apis/login');
const addEquipment = require('./apis/addEquipment');
const editEquipment = require('./apis/editEquipment');
const createMaintenanceSchedule = require('./apis/createMaintenanceSchedule');
const editMaintenanceSchedule = require('./apis/editMaintenanceSchedule');
const addRepairLogEntry = require('./apis/addRepairLogEntry');
const markMaintenanceComplete = require('./apis/markMaintenanceComplete');
const markRepairComplete = require('./apis/markRepairComplete');

mongoose.connect('mongodb+srv://svlabs:mproject295a@cluster0.cs0zx.mongodb.net/pmess?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("HELLO");
})


app.use('/createUser', createUser);
app.use('/login', login);
// app.use('/addEquipment', addEquipment);
// app.patch('/editEquipment', editEquipment);
// app.post('/createMaintenanceSchedule', createMaintenanceSchedule);
// app.patch('/editMaintenanceSchedule', editMaintenanceSchedule);
// app.post('/addRepairLogEntry', addRepairLogEntry);
// app.patch('/markMaintenanceComplete', markMaintenanceComplete);
// app.patch('/markRepairComplete', markRepairComplete);

module.exports = app;