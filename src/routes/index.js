import { Router } from "express";

import signUp from "./sign_up.js";

const router = Router();

router.get("/", (req, res) => res.send("Index: not yet implemented"));

export default function mountRoutes(app) {
  app.use("/", router);
  app.use("/sign-up", signUp);
}
