import { Router } from "express";

import userRouter from "./user.js";

import { index_get } from "../controller/indexController.js";

const router = Router();

export default function mountRoutes(app) {
  app.use("/", router);
  app.use("/user", userRouter);
}

router.get("/", index_get);
