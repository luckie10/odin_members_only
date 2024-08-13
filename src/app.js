const PORT = 5173;

import express, { urlencoded } from "express";

import mountRoutes from "./routes/index.js";

const app = express();
app.set("views", "./views/");
app.set("view engine", "ejs");

app.use(urlencoded({ extended: false }));
mountRoutes(app);

app.listen(PORT, () => console.log(`Listenting on port ${PORT}`));
