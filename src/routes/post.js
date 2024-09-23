import Router from "express-promise-router";

import {
  create_get,
  create_post,
  delete_get,
} from "../controller/postController.js";

const router = Router();

export default router;

router.get("/create", create_get);
router.post("/create", create_post);
router.get("/:id/delete", delete_get);
