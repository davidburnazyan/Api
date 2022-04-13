const express = require("express");
const jwt = require("jsonwebtoken");

import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Api",
  });
});

app.post("/api/posts", (req: Request, res: Response) => {
  res.json({
    message: "did work the post Api",
  });
});

jwt;

app.post("/api/login", (req: Request, res: Response) => {
  const user = {
    username: req.body.name,
    email: req.body.email,
  };

  jwt.sign(user, "secretKey", (err: any, token: string) => {
    res.json({
      token,
    });
  });
});

app.listen(5000, () => console.log("Server started on port 5000"));
