import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth";
import crudRoute from "./routes/crud";
import { verifyToken } from "./middleware/verifyToken";

const cors = require("cors");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const prefix = "/api";

const mongoDB = process.env.DB_URL || "";

mongoose.connect('mongodb+srv://davidburnazyan:jXKHcYjkczynI4Ft@cluster0.xh5nagh.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection; // 2

app.use(prefix, authRoute);
// app.use(prefix, verifyToken, crudRoute);
app.use(prefix, crudRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:")); // 3
app.listen(5000, () => console.log("Server started on port 5000"));
