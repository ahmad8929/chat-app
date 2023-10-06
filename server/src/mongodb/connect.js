const mongoose = require("mongoose");

async function connect2DB() {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/cchat");
        console.log('connected to db');
    } catch(err) {
        console.error(err)
    }
}

module.exports = connect2DB;