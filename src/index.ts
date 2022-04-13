const express = require("express");
import { Request, Response } from "express";

const app = express();

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

app.listen(5000, () => console.log("Server started on port 5000"));
