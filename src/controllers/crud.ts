import { Request, Response } from "express";

export const Read = (req: Request, res: Response) => {
  res.json({
    message: "----------Read",
  });
};

export const Create = (req: Request, res: Response) => {
  res.json({
    message: "----------Create",
  });
};
