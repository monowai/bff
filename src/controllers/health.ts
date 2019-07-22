import express from "express";

const router = express.Router();

router.get("/health", (req: express.Request, res: express.Response) => {
  res.send({ status: "UP" });
});

export default router;
