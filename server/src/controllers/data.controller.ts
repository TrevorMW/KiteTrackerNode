import { Request, Response } from "express";
import { saveData } from "../services/data.service";

export const submitData = async (req: Request, res: Response) => {
  const payload = req.body;

  // validation will go here later

  await saveData(payload);

  res.status(201).json({ success: true });
};