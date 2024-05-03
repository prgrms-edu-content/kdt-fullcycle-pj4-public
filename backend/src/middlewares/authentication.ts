import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { JWT_SECRET } from "../settings";

declare module "express" {
  export interface Request {
    user?: User;
  }
}

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
  // 쿠키에서 JWT 획득 (존재하지 않을 시 401 반환)
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.sendStatus(401);
  }

  // JWT 검증 (실패 시 401 반환)
  try {
    jwt.verify(accessToken, JWT_SECRET);
  } catch {
    return res.sendStatus(401);
  }

  // JWT에서 획득한 email 통해 User 획득 (존재하지 않을 시 401 반환)
  const { email } = jwt.decode(accessToken) as { email: string };
  const user = await User.findOne({ email });
  if (!user) {
    return res.sendStatus(401);
  }

  // User를 Request 객체에 저장
  req.user = user;
  next();
}
