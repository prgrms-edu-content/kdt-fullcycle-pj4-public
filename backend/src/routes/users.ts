import express, { Request } from "express";
import jwt from "jsonwebtoken";
import { isQueryError } from "../utils/mysql";
import { User } from "../models/user";
import { JWT_SECRET } from "../settings";
import { authenticateUser } from "../middlewares/authentication";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isPasswordVerified = await user?.verifyPassword(password);
  if (!isPasswordVerified) {
    return res.sendStatus(401);
  }

  const accessToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: "14d" });
  res.cookie("access-token", accessToken, {
    httpOnly: true,
    ...(process.env.NODE_ENV === "development"
      ? {
          sameSite: "lax",
          secure: false,
        }
      : {
          sameSite: "none",
          secure: true,
        }),
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14일
  });
  res.sendStatus(204);
});

router.post("/logout", (req, res) => {
  res.clearCookie("access-token");
  res.sendStatus(204);
});

router.get("/users/me", authenticateUser, async (req: Request, res) => {
  const user = req.user!;
  res.json({
    email: user.email,
  });
});

router.post("/users", async (req, res) => {
  const { email, password } = req.body;
  try {
    await User.create({ email, password });
  } catch (error) {
    if (isQueryError(error) && error.code === "ER_DUP_ENTRY") {
      return res.sendStatus(409);
    }
    throw error;
  }
  res.sendStatus(201);
});

export { router as usersRouter };
