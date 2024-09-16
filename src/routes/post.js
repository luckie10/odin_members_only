import Router from "express-promise-router";

import { create_get, create_post } from "../controller/postController.js";

const router = Router();

export default router;

router.get("/create", create_get);
router.post("/create", create_post);
