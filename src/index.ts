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

mongoose.connect('mongodb+srv://david:llNo5t0hE8a5RPes@cluster0.v9b7v.mongodb.net/?retryWrites=true&w=majority'); //  { useNewUrlParser: true, useUnifiedTopology: true} // 1

const db = mongoose.connection; // 2

app.use(prefix, authRoute);
app.use(prefix, verifyToken, crudRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:")); // 3
app.listen(5000, () => console.log("Server started on port 5000"));
