import Router from "express-promise-router";

const router = Router();

export default router;

router.get("/", (req, res) => res.send("Sign-up GET: Not yet Implemented"));
router.post("/", (req, res) => res.send("Sign-up POST: Not yet Implemented"));
