const jwt = require("jsonwebtoken");

import { Request, Response } from "express";

const SignIn = (req: Request, res: Response) => {
  console.log(1111);
  res.json({
    message: "Welcome to the Api",
  });
};

const SignUp = (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  jwt.sign(
    user,
    process.env.TOKEN_SECRET,
    { expiresIn: "30s" },
    (err: any, token: string) => {
      res.json({
        token,
      });
    }
  );
};

module.exports = {
  SignIn,
  SignUp,
};
