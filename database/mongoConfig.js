const express = require('express');
const mongoose = require('mongoose');

const app = express();

function connectMongo(){
    const username = "ShivamVish9450";
    const password = "ShivamVish%409450";
    const cluster = "clustershivam.j2zze";
    const dbname = "realityDB";
    // console.log(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`);
    mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true
    }
    );
}

connectMongo();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db;