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

mongoose.connect(mongoDB); //  { useNewUrlParser: true, useUnifiedTopology: true} // 1

const db = mongoose.connection; // 2

app.use(prefix, authRoute);
app.use(prefix, verifyToken, crudRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:")); // 3
app.listen(5000, () => console.log("Server started on port 5000"));
