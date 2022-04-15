import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth";
import crudRoute from "./routes/crud";

import { verifyToken } from "./middleware/verifyToken";

const app = express();

dotenv.config();
app.use(express.json());

const prefix = "/api";

app.use(prefix, authRoute);
app.use(prefix, verifyToken, crudRoute);

app.listen(5000, () => console.log("Server started on port 5000"));
