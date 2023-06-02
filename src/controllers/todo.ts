import { Request, Response } from "express";
import ToDo from "../models/todo";


export const get = async (req: Request, res: Response) => {
  const response = await ToDo.find()

  return res.json({
    message: 'To Do',
    response: response
  });
}

export const create = async (req: Request, res: Response) => {
  const response = await ToDo.create({ payload: req.body.payload })

  return res.json({
    message: 'Created',
    response: response
  });
}

export const DeleteAll = async (req: Request, res: Response) => {
  await ToDo.remove({})

  return res.json({
    message: 'Done',
  });
};
