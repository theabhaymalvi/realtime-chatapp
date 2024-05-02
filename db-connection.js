const mongoose = require("mongoose")
const DB_URL = "mongodb+srv://theabhaymalvi:2td9Fr932525JXh8@taskify.4ofecqn.mongodb.net/chatapp"
const mongoDbConnection = ()=> {
    try {
        mongoose.connect(DB_URL);
        console.log("Database connection is Successful");
    } catch (error) {
        console.log("Database connection failed - "+error);
    }
}

module.exports = mongoDbConnection;