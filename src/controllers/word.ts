import { Request, Response } from "express";
import WordModal from "../models/word";

export const Read = async (req: Request, res: Response) => {
  try {
    const response = await WordModal.find();

    res.json({
      message: response,
    });
  } catch (err) {
    console.log(err, "------err");
  }
};

export const Create = async (req: Request, res: Response) => {
  try {
    const response = await WordModal.create({
      en: req.body.en,
      arm: req.body.arm,
    });

    res.json({
      message: response,
    });
  } catch (err) {
    console.log(err, "------err");
  }
};
