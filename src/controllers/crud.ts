import { Request, Response } from "express";
import MessageModal from '../models/message';


export const Read = async (req: Request, res: Response) => {
  try {
    const response = await MessageModal.find();
    
    res.json({
      message: response,
    });
  } catch(err) {
    console.log(err, '------err');
  }
};

export const Create = async (req: Request, res: Response) => {  
  try {
    const response = await MessageModal.create({
      message: req.body.message,
      from: req.body.from,
      to: req.body.to
    });
    
    res.json({
      message: response,
    });
  } catch(err) {
    console.log(err, '------err');
  }
};
