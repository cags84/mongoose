const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    name: String,
    date: Date
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;