const Logger = require("../logger");
const express = require("express");
const router = express.Router();
const { getCategories } = require("../services/category.dal");

const lg = new Logger();
lg.listen();

router.get("/", async (req, res) => {
  if (DEBUG) console.log("shop.GET ('/')");
  try {
    let categories = await getCategories(); //from postgresql
    res.render("shopCategory", { categories });
    lg.emit(
      "log",
      "shop.GET('/')",
      "INFO",
      `${res.statusCode}: (client@${req.socket.remoteAddress}) Categories succesfully recieved.`
    );
  } catch (error) {
    res.render("503");
    lg.emit(
      "log",
      "shop.GET('/')",
      "ERROR",
      `${res.statusCode}: (client@${req.socket.remoteAddress}) Problem retrieving category information: ${error}`
    );
  }
});
