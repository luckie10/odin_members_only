import { Router } from "express";

import userRouter from "./user.js";

const router = Router();

router.get("/", (req, res) => res.send("Index: not yet implemented"));

export default function mountRoutes(app) {
  app.use("/", router);
  app.use("/user", userRouter);
}
