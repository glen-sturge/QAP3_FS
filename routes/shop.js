const Logger = require("../logger");
const express = require("express");
const router = express.Router();
const { getCategories } = require("../services/category.dal");
const { getProductByCategoryId } = require("../services/products.dal");
const lg = new Logger();
lg.listen();

router.get("/", async (req, res) => {
  if (DEBUG) console.log("shop.GET ('/')");
  //   const categories = [
  //     {
  //       category_id: "1",
  //       category_name: "prod_test_01",
  //       category_description: "test desription 01",
  //       category_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //     },
  //     {
  //       category_id: "2",
  //       category_name: "prod_test_02",
  //       category_description: "test desription 02",
  //       category_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //     },
  //     {
  //       category_id: "3",
  //       category_name: "prod_test_03",
  //       category_description: "test desription 03",
  //       category_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //     },
  //   ];
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

//products by category
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("shop.GET ('/:id')");
  try {
    let products = await getProductByCategoryId(req.params.id);
    if (products.length === 0) {
      res.render("norecord");
    } else {
      res.render("shopProducts", { products });
    }
  } catch {
    res.render("503");
  }
});

module.exports = router;
