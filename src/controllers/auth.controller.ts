import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Get, HttpCode, JsonController, Post, Req, Res, UseAfter } from "routing-controllers";
import User from "../models/user";
import { Request, Response } from "express";
import { generateJWT } from "../utils/jwtToken";
import { generateHashedPassword } from "../utils/generateHashePassword";
import user from "../models/user";
import { Service } from "typedi";
import { HttpStatus } from "../enums";

interface IBody {
  email: string;
  name: string;
  surname: string;
  password: string;
}

@Service()
@JsonController('/auth')
export class AuthController {

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const response = await user.findOne({ email: req.body.email })

    if (!response || !response?.password) {
      return res.json({ message: 'Something went wrong.' });
    }

    const bcryptResponse = await bcrypt.compare(req.body.password, response.password)

    if (!bcryptResponse) {
      return res.json({ message: 'Something went wrong.' });
    }

    res.json({
      access_token: response.access_token,
      refresh_token: response.refresh_token
    });

  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const { email, name, surname, password }: IBody = req.body;

    try {
      const hashedPassword = await generateHashedPassword(password);

      if (!hashedPassword) {
        throw new Error("Hashed Password Error:");
      }

      const token = await generateJWT({ email, password: hashedPassword });

      if (!token) {
        throw new Error("Token Missing Error:");
      }

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
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  @Get('/getUserInfo')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const bearerToken = req.headers.authorization as string;

    const splitted = bearerToken.split(' ')

    if (splitted.length !== 2) {
      return res.json({ message: "Something went wrong." })
    }

    const response = await user.findOne({ access_token: splitted[1] })

    if (!response) {
      return res.json({ message: "Something went wrong." })
    }

    res.json({
      email: response.email,
      name: response.name,
      surname: response.surname,
    });
  };
}