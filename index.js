/*
    base file for express project.

    updated on 7/24/2023.
    author: Glen Sturge
*/
const express = require("express");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

global.DEBUG = true;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "username here" }); //be cool to have a login...
});

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const shopRouter = require("./routes/shop");
app.use("/shop", shopRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () =>
  console.log(`Server active and listening on port ${PORT}`)
);
