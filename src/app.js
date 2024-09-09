import express, { urlencoded } from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import "dotenv/config";

import mountRoutes from "./routes/index.js";
import { getUserById, getUserByUsername } from "./db/queries.js";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) return done(null, false, { message: "Incorrect username." });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return done(null, false, { message: "Incorrect password." });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(async (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

mountRoutes(app);

const port = process.env.PORT || 5173;
app.listen(port, () => console.log(`Listenting on port ${port}`));
