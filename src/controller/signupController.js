import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

import { insertUser } from "../db/queries.js";

export const getSignup = async (req, res, next) => {
  res.render("sign_up_form");
};

const validateUser = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters."),
  body("password").isLength({ min: 5 }),
  body("confirm_password").custom(
    (value, { req }) => value === req.body.password,
  ),
];

export const postSignup = [
  ...validateUser,

  async (req, res, next) => {
    const errors = validationResult(req);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
    };

    if (!errors.isEmpty()) {
      return res.render("sign_up_form", { user, errors: errors.array() });
    }

    bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        // TODO: send to internal error page
        console.log(err);
        return;
      }

      await insertUser({ ...user, password: hashedPassword });
      res.redirect("/");
    });
  },
];
