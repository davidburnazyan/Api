import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { verifyToken } from "./middleware/verifyToken";
import { LOCAL_DB } from "./config";
import { RoutingService } from "./routes";

const cors = require("cors");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const prefix = "/api";

const mongoDB = process.env.MONO_DB_URL || LOCAL_DB;

mongoose.connect(mongoDB);

const db = mongoose.connection;

app.use(prefix, RoutingService.wordRouting);
app.use(prefix, RoutingService.authRoute);
app.use(prefix, verifyToken, RoutingService.crudRoute);

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.listen(5000, () => console.log("Server started on port 5000"));
