require("dotenv").config();
var cors = require('cors');
const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
app.use(cors());

const sequelize = require('./config/db');
const router = require('./router/router');
const middelware = require('./middleware/midd')

app.use(express.json());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/", router)

app.get('/getdata', (req, res) => {
    res.json({
        "name": "afeen"
    })
})


app.use(middelware.onError);
app.listen(process.env.APP_PORT, () => {
    console.log("Server running on PORT : ", process.env.APP_PORT);
});


// sequelize.sync({ force: true })


