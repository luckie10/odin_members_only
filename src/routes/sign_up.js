import Router from "express-promise-router";

import { getSignup, postSignup } from "../controller/signupController.js";

const router = Router();

export default router;

router.get("/", getSignup);
router.post("/", postSignup);
