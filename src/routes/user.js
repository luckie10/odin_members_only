import Router from "express-promise-router";

import {
  logIn_get,
  logIn_post,
  signUp_get,
  signUp_post,
} from "../controller/userController.js";

const router = Router();

export default router;

router.get("/sign-up", signUp_get);
router.post("/sign-up", signUp_post);
router.get("/log-in", logIn_get);
router.post("/log-in", logIn_post);
