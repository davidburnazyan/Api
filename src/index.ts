import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import crudRoute from "./routes/crud";
import wordRoute from "./routes/word";

import { verifyToken } from "./middleware/verifyToken";

const cors = require("cors");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const prefix = "/api";

const localDb =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1";
const mongoDB = process.env.MONO_DB_URL || localDb;

mongoose.connect(mongoDB);

const db = mongoose.connection; // 2

app.use(prefix, wordRoute);
app.use(prefix, authRoute);
app.use(prefix, verifyToken, crudRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:")); // 3
app.listen(5000, () => console.log("Server started on port 5000"));
