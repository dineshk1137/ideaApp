const express = require("express");
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const userModel = require("./models/user.model");
const app = express();
/**
 * logic to connect to MongoDB and create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;


db.on("error", ()=>{
    console.log("Error while connecting to DB");
});

db.once("open", ()=>{
    console.log("database is connected");

    init();
})

async function init(){
    
    let admin = await userModel.findOne({
        userId : "admin"
    }) 
    if(admin){
        console.log("Admin already present");
        return;
    }

    admin = await userModel.create({
        name : "Dinesh Kumar", 
        userId : "admin",
        email : "chandradinesh938@gmail.com",
        userType: "ADMIN",
        password : "Dinesh@1"
    });
    console.log(admin);
}



app.listen(serverConfig.PORT, ()=>{
    console.log(`server Started on port no ${serverConfig.PORT}`);
})