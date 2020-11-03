const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./apis/user');
const equipment = require('./apis/equipment');
const maintenance = require('./apis/maintenance');
const repair = require('./apis/repair');
const cors = require('cors');

mongoose.connect('mongodb+srv://svlabs:mproject295a@cluster0.cs0zx.mongodb.net/pmess?retryWrites=true&w=majority');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("HELLO");
})
// APIs
app.use('/user', user);
app.use('/equipment', equipment);
app.use('/maintenance', maintenance);
app.use('/repair', repair);

module.exports = app;