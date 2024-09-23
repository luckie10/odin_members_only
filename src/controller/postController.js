import { body, validationResult } from "express-validator";

import { deletePostById, insertPost } from "../db/queries.js";

const messageFactory = (title, body) => {
  return {
    title: title,
    body: body,
  };
};

export const create_get = async (req, res, next) => {
  res.render("create_post_form", messageFactory());
};

export const create_post = [
  body("title", "Title must be specified.").trim().notEmpty().escape(),
  body("body", "Message must be specified.").trim().notEmpty().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    const message = messageFactory(req.body.title, req.body.body);

    if (!errors.isEmpty()) {
      return res.render("create_post_form", {
        message,
        errors: errors.array(),
      });
    }

    await insertPost(message, req.user.id);
    res.send("Create POST. Not yet implemented.");
  },
];

export const delete_get = async (req, res, next) => {
  await deletePostById(req.params.id);
  res.redirect("/");
};
