const jwt = require("jsonwebtoken");

import { Request, Response } from "express";

export const SignIn = (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Api",
  });
};

export const SignUp = (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  jwt.sign(
    user,
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" },
    (err: any, token: string) => {
      res.json({
        token,
      });
    }
  );
};
