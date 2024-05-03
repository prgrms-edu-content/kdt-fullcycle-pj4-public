import { NextFunction, Request, Response } from "express";
import { Note } from "../models/note";

declare module "express" {
  export interface Request {
    note?: Note;
  }
}

export async function authorizeNote(req: Request, res: Response, next: NextFunction) {
  // Request 객체에서 User 획득
  const user = req.user!;

  // 요청 URL의 id 파라미터 통해 Note 획득 (실패 시 404 반환)
  const id = Number(req.params.id);
  const note = await Note.findOne({ id });
  if (!note) {
    return res.sendStatus(404);
  }

  // Note의 userId와 User의 id가 일치하는지 확인 (일치하지 않으면 403 반환)
  if (user.id !== note.userId) {
    return res.sendStatus(403);
  }

  // Note를 Request 객체에 저장
  req.note = note;
  next();
}
