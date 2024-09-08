import express, { urlencoded } from "express";
import path from "path";
import "dotenv/config";

import mountRoutes from "./routes/index.js";

const app = express();
app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(urlencoded({ extended: false }));
mountRoutes(app);

const port = process.env.PORT || 5173;
app.listen(port, () => console.log(`Listenting on port ${port}`));
