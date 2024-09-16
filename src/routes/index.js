import { Router } from "express";

import userRouter from "./user.js";
import postRouter from "./post.js";

import { index_get } from "../controller/indexController.js";

const router = Router();

export default function mountRoutes(app) {
  app.use("/", router);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
}

router.get("/", index_get);
