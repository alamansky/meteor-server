let mongoose = require("mongoose");
require('dotenv').config();

const DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ints3.mongodb.net/test?retryWrites=true&w=majority`;

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(DB_URI, {
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log("Database connection successful");
            })
            .catch(err => {
                console.error("Database connection error");
                console.error(err);
            });
    }
}

module.exports = new Database();