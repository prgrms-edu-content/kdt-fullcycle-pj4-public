import express, { Request } from "express";
import { Note } from "../models/note";
import { authenticateUser } from "../middlewares/authentication";
import { authorizeNote } from "../middlewares/authorization";

const router = express.Router();

router.get("/notes", authenticateUser, async (req: Request, res) => {
  const user = req.user!;
  const notes = await Note.findAll({ userId: user.id });
  res.json(notes);
});

router.get("/notes/:id", authenticateUser, authorizeNote, async (req: Request, res) => {
  const note = req.note!;
  res.json(note);
});

router.post("/notes", authenticateUser, async (req: Request, res) => {
  const user = req.user!;
  const { title, content } = req.body;
  const note = await Note.create({ title, content, userId: user.id });
  res.status(201).json(note);
});

router.put("/notes/:id", authenticateUser, authorizeNote, async (req: Request, res) => {
  const user = req.user!;
  const note = req.note!;
  const { title, content } = req.body;
  await note.update({ title, content, userId: user.id });
  res.json(note);
});

router.delete("/notes/:id", authenticateUser, authorizeNote, async (req: Request, res) => {
  const note = req.note!;
  await note.delete();
  res.sendStatus(204);
});

export { router as notesRouter };
