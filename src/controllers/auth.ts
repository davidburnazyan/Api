import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import { Request, Response } from "express";
import { generateJWT } from '../utils/jwtToken';
import { generateHashedPassword } from '../utils/generateHashePassword';

export const SignIn = (req: Request, res: Response) => {
  res.json({
    message: "Welcome to the Api",
  });
};

interface IBody {
  email: string,
  name: string,
  surname: string,
  password: string,
}

export const SignUp = async (req: Request, res: Response) => {
  const { email, name, surname, password }: IBody = req.body;

  try {
    const hashedPassword = await generateHashedPassword(password);
    if(!hashedPassword) {
      throw new Error("-------hashedPassword");
    }

    const token = await generateJWT({ email, password: hashedPassword });
    
    if(token) {      
      const user = await User.create({ 
        email,
        name,
        surname,
        password: hashedPassword,
        access_token: token,
        refresh_token: token 
      })

      res.json({
        user
      });
    }
  } catch(err) {

  }

//   (err, token: string | undefined) => {
//     if(err) {
//       console.log(err, '-----err');
//     }
//     if(token) {
//       User.create({ 
//         ...user,
//         access_token: token,
//         refresh_token: token 
//       })
//       .then(user => res.json(user))
//     }
//   }

};
