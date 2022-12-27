import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { Request, Response } from "express";
import { generateJWT } from "../utils/jwtToken";
import { generateHashedPassword } from "../utils/generateHashePassword";
import user from "../models/user";

interface IBody {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export const signIn = (req: Request, res: Response) => {
  user
    .findOne({ email: req.body.login })
    .then(async (response) => {
      const bcryptResponse = await bcrypt.compare(req.body.password, response.password)

      if (bcryptResponse) {
        res.json({
          access_token: response.access_token,
          refresh_token: response.refresh_token
        });
      }
    })
};

export const signUp = async (req: Request, res: Response) => {
  const { email, name, surname, password }: IBody = req.body;

  try {
    const hashedPassword = await generateHashedPassword(password);

    if (!hashedPassword) {
      throw new Error("-------hashedPassword");
    }

    const token = await generateJWT({ email, password: hashedPassword });

    if (token) {
      const user = await User.create({
        email,
        name,
        surname,
        password: hashedPassword,
        access_token: token,
        refresh_token: token,
      });

      res.json({
        user,
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const getUserInfo = (req: Request, res: Response) => {
  // by access token, or Id

  res.json({
    age: "26",
    name: "David",
    surname: "Burnazyan",
    phone: "+37491335303",
    email: "david.burnazyan.96@gmail.com",
  });
};
