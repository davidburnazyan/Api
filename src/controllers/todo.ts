import { Request, Response } from "express";
import ToDo from "../models/todo";


export const get = async (req: Request, res: Response) => {
  const response = await ToDo.find()

  return res.json({
    message: 'To Do',
    data: response
  });
}

export const create = async (req: Request, res: Response) => {
  const id = req.body.id;
  const title = req.body.title;
  const image = req.body.image;

  const response = await ToDo.create({ id, title, image })

  return res.json({
    message: 'Created',
    data: response
  });
}

export const DeleteAll = async (req: Request, res: Response) => {
  await ToDo.remove({})

  return res.json({
    message: 'Done',
  });
};
