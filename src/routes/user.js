import Router from "express-promise-router";

import { signUp_get, signUp_post } from "../controller/userController.js";

const router = Router();

export default router;

router.get("/sign-up", signUp_get);
router.post("/sign-up", signUp_post);
