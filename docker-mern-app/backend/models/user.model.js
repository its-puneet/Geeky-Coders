const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "User-Data" });

const model = mongoose.model("UserData", UserSchema);
module.exports = model;