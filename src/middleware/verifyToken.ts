const jwt = require("jsonwebtoken");

import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers["authorization"];
  const token = authorization?.split(" ")[1];

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    function (err: any, decoded: any) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      res.status(200).send(decoded);
    }
  );
}
