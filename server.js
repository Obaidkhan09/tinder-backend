import express from 'express';
import mongoose from 'mongoose';
import Cors from "cors";
import 'dotenv/config';

import Cards from "./cardScema.js"

//App Config
const app = express();
const port = process.env.PORT || 4000;
const connection_url = `mongodb+srv://tinderadmin:${process.env.REACT_APP_PASSWORD}@cluster0.g0dgp.mongodb.net/tinderdb?retryWrites=true&w=majority`

//DB Config
async function connectionFunction () {
    await mongoose.connect(connection_url)
    .then(()=>console.log("Connected to DB"))
    .catch((err)=>console.log(err));
    
}
connectionFunction();
//for version 6 of mongoose, we don't need 
//userParser etc, it's by default set.

//Middleware
app.use(express.json());
app.use(Cors());

//API Endpoints
app.get('/', (req, res) => {
    res.status(200).send("Hello to Back-End..!!!")
});

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (data) {
            res.status(201).send(data);
        }
    });
});

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (data) {
            res.status(200).send(data)
        }
    });
});
app.delete("/tinder/cards/:id", (req, res) => {
    const  temp = req.params.id;
    // console.log(temp);
    // res.status(200).send("Done");
    Cards.findOneAndDelete({_id: temp }, function (err, docs) {
        if (err){
            console.log(err);
            res.status(500).send("Error occured");
        }
        else{
            console.log("Deleted Image : ", docs);
            res.status(200).send("Item deleted.!");
        }
    });
})
//Listner
app.listen(port, () => console.log(`Listning on port ${port}`));