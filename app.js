const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Visitor = require("./Models/Visitor");

dotenv.config();
const port = 3000;
const app = express();

app.use(express.urlencoded({extended: false}))

const db = async () => {
    options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', options);
        console.log("Connection database successfully!");
    } catch(err) {
        console.log(err);
    }
}

db();

app.get('/:name?', (req, res) => {
    const { name = 'Anónimo' } = req.query;
    const now = new Date();
    console.log(now);
    const data = {
        name: name,
        date: now
    };
    const visitor = new Visitor(data);
    visitor.save()
    .then(visitor => 
        res.status(201).send(`<h1>El visitante fue almacenado con éxito</h1>`)
    ).catch(err => res.status(500).send({err}))
});

app.listen(port, (err) => {
    if(err) console.error(err);
    console.log(`Server running on ${port}`);
});