const express = require("express");
const cors=require("cors");
const sequelize=require("./util/database")

require('dotenv').config();

const userDetails = require("./routes/user-routes");

const app=express();

app.use(cors());
app.use(express.json());

app.use(userDetails);


sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log('server is running on port 3000');
    });
})