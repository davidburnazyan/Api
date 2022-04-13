const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const signRoute = require("./routes/sign");

const app = express();

dotenv.config();
app.use(express.json());

const prefix = "/api";

app.use(prefix, signRoute);
app.use(prefix, signRoute);

app.listen(5000, () => console.log("Server started on port 5000"));

export {};
