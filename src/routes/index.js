import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.send("Index: not yet implemented"));

export default function mountRoutes(app) {
  app.use("/", router);
}
