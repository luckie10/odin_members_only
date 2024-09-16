import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

import { insertUser, updateUserById } from "../db/queries.js";
import passport from "passport";

const userFactory = (firstName, lastName, username) => {
  return {
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    username: username || undefined,
  };
};

export const signUp_get = async (req, res, next) => {
  res.render("sign_up_form", { ...userFactory() });
};

const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("lastName")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Last name must be specified.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),
  body("username")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters."),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters.")
    .escape(),
  body("confirm_password")
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password),
];

export const signUp_post = [
  ...validateUser,

  async (req, res, next) => {
    const errors = validationResult(req);

    const user = userFactory(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
    );

    if (!errors.isEmpty()) {
      return res.render("sign_up_form", { ...user, errors: errors.array() });
    }

    // TODO: Check for existing user

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

export const logIn_get = async (req, res, next) => {
  res.render("log_in_form", { username: undefined });
};

export const logIn_post = passport.authenticate("local", {
  successRedirect: "/user/code",
  failureRedirect: "/",
});

export const logOut_get = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
};

export const code_get = async (req, res, next) => {
  res.render("code_form");
};

export const code_post = [
  body("code", "Code must be specified.").notEmpty().trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("code_form", { errors: errors.array() });
    }

    if (req.body.code === "Not so") {
      const response = await updateUserById(
        res.locals.currentUser.id,
        "member_status",
        "member",
      );
      return;
    }

    res.render("code_form", { errors: [{ msg: "Incorrect code." }] });
  },
];
