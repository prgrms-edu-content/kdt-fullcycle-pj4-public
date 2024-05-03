import express from "express";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(204);
});

export { router as healthcheckRouter };
