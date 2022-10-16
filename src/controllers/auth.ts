import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/user";
import { Request, Response } from "express";
import { generateJWT } from "../utils/jwtToken";
import { generateHashedPassword } from "../utils/generateHashePassword";

interface IBody {
  email: string;
  name: string;
  surname: string;
  password: string;
}

export const signIn = (req: Request, res: Response) => {
  res.json({
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZmMxNTIxNi01MGFhLTRiMmItYTBlOC01OTAzOWRkNzRkZDEiLCJpYXQiOjE2NjU5MDcwNzksImV4cCI6MTY2NjA4NzA3OX0.P3OTDatMyA13yNFcOsOSBJIjeDzW6PSdCO-P3_1VFJI",
    refresh_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZmMxNTIxNi01MGFhLTRiMmItYTBlOC01OTAzOWRkNzRkZDEiLCJpYXQiOjE2NjU5MDcwNzksImV4cCI6MTY2ODQ5OTA3OX0.GgqkYYTMR5lwfF3kqpCQe1-RYYtwGhGJS-eP_7eVrr8",
  });
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
  res.json({
    age: "26",
    name: "David",
    surname: "Burnazyan",
    phone: "+37491335303",
    email: "david.burnazyan.96@gmail.com",
  });
};
