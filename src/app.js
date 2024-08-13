const PORT = 5173;

import express, { urlencoded } from "express";

const app = express();
app.set("views", "./views/");
app.set("view engine", "ejs");

app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("Index: not yet implemented"));

app.listen(PORT, () => console.log(`Listenting on port ${PORT}`));
