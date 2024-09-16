import Router from "express-promise-router";

import {
  code_get,
  code_post,
  logIn_get,
  logIn_post,
  logOut_get,
  signUp_get,
  signUp_post,
} from "../controller/userController.js";

const router = Router();

export default router;

router.get("/sign-up", signUp_get);
router.post("/sign-up", signUp_post);
router.get("/log-in", logIn_get);
router.post("/log-in", logIn_post);
router.get("/log-out", logOut_get);
router.get("/code", code_get);
router.post("/code", code_post);
