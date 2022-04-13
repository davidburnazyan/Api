const jwt = require("jsonwebtoken");

import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (typeof authHeader !== undefined) {
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    }

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
