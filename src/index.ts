import express from "express";
import dotenv from "dotenv";
// import  {MongoClient} from  'mongodb';
import mongoose from 'mongoose';

import authRoute from "./routes/auth";
import crudRoute from "./routes/crud";

import { verifyToken } from "./middleware/verifyToken";

const app = express();

const mongoDB = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1";
mongoose.connect(mongoDB); // , { useNewUrlParser: true, useUnifiedTopology: true}

const db = mongoose.connection;

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  name: String,
});

const UserModel = mongoose.model('UserModel', SomeModelSchema );

// UserModel.create({ name: 'David' })
// .then(res => {
//     console.log(res, '-----res');
    
// })

UserModel.find()
.then(res => {
    console.log(res, '-----res');
    
})

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

dotenv.config();
app.use(express.json());

const prefix = "/api";

app.use(prefix, authRoute);
app.use(prefix, verifyToken, crudRoute);

app.listen(5000, () => console.log("Server started on port 5000"));
