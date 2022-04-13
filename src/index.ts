const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

import { Request, Response, NextFunction } from "express";

const app = express();

dotenv.config();
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Api",
  });
});

app.post("/api/posts", verifyToken, (req: Request, res: Response) => {
  res.json({
    message: "did work the post Api",
  });
});

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

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== undefined) {
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
      (err: any, user: any) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        req.body.user = user;

        next();
      }
    );
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started on port 5000"));
