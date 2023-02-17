import { Request, Response } from "express";
import WordModal from "../models/word";

export const Read = async (req: Request, res: Response) => {
  try {
    const response = await WordModal.find();

    res.json({
      message: response,
    });
  } catch (err) {
    res.json({ message: 'Something went wrong' });
  }
};

export const Create = async (req: Request, res: Response) => {
  try {

    const checkExist = await WordModal
      .find({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })
      .find({ $or: [{ 'en': { $regex: req.body.en } }, { 'arm': { $regex: req.body.arm } }] })

    if (checkExist.length) {

      return res.json({
        message: 'Probably word already exist.',
        response: checkExist
      });
    }

    const response = await WordModal.create({
      en: req.body.en,
      arm: req.body.arm,
    });

    return res.json({
      message: 'Word successfully added.',
      response,
    });
  } catch (err) {
    res.json({ message: 'Something went wrong' });
  }
};

export const Delete = async (req: Request, res: Response) => {
  try {

    const checkExist = await WordModal
      .findOneAndDelete({ $or: [{ 'en': req.body.en }, { 'arm': req.body.arm }] })


    if (checkExist && Object.keys(checkExist).length) {
      return res.json({
        message: 'Following items was successfully deleted.',
        response: checkExist
      });
    }

    return res.json({
      message: 'The given word is missing',
    });
  } catch (err) {
    res.json({ message: 'Something went wrong' });
  }
};