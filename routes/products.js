const Logger = require("../logger");
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  putProduct,
} = require("../services/products.dal");

const lg = new Logger();
lg.listen();

router.get("/", async (req, res) => {
  //   const products = [
  //     {
  //       product_id: "1",
  //       product_name: "prod_test_01",
  //       product_description: "test desription 01",
  //       product_price: 10.99,
  //       product_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //       category_id: 1,
  //     },
  //     {
  //       product_id: "2",
  //       product_name: "prod_test_02",
  //       product_description: "test desription 02",
  //       product_price: 12.99,
  //       product_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //       category_id: 1,
  //     },
  //     {
  //       product_id: "3",
  //       product_name: "prod_test_03",
  //       product_description: "test desription 03",
  //       product_price: 33.99,
  //       product_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //       category_id: 1,
  //     },
  //   ];
  try {
    let products = await getProducts(); //from postgresql
    res.render("products", { products });
    lg.emit(
      "log",
      "products.GET('/')",
      "INFO",
      `${res.statusCode}: (client@${req.socket.remoteAddress}) Products succesfully recieved.`
    );
  } catch (error) {
    res.render("503");
    lg.emit(
      "log",
      "products.GET('/')",
      "ERROR",
      `${res.statusCode}: Problem retrieving product information: ${error}`
    );
  }
});

router.get("/:id", async (req, res) => {
  //   const aProduct = [
  //     {
  //       product_id: "3",
  //       product_name: "prod_test_03",
  //       product_description: "test desription 03",
  //       product_price: 33.99,
  //       product_image:
  //         "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  //       category_id: 1,
  //     },
  //   ];
  try {
    let aProduct = await getProductById(req.params.id);
    if (aProduct.length === 0) {
      res.render("norecord");
    } else {
      res.render("product", { aProduct });
    }
  } catch {
    res.render("503");
  }
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("product.Delete : " + req.params.id);
  let aProduct = await getProductById(req.params.id);
  res.render("productDelete.ejs", { aProduct });
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("product.REPLACE : " + req.params.id);
  let aProduct = await getProductById(req.params.id);
  res.render("putProduct.ejs", { product: aProduct[0] });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("products.POST");
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_image,
      category_id,
    } = req.body;

    if (DEBUG) console.log("Data extracted from request body");
    await addProduct(
      product_name,
      product_description,
      product_price,
      product_image,
      category_id
    );
    res.redirect("/products/");
  } catch {
    //logging here.
    res.render("503");
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("product.PUT: product_id=" + req.params.id);
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_image,
      category_id,
    } = req.body;
    await putProduct(
      req.params.id,
      product_name,
      product_description,
      product_price,
      product_image,
      category_id
    );
    res.redirect("/products/");
  } catch (error) {
    if (DEBUG)
      console.log(
        `There was an error replacing product data, product_id=${req.params.id}:\n${error} `
      );
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("products.DELETE: product_id=" + req.params.id);
  try {
    await deleteProduct(req.params.id);
    res.redirect("/products/");
  } catch (err) {
    if (DEBUG)
      console.log(
        `There was an error deleting record, product_id=${req.params.id}:\n${err}`
      );
    //logging here
    res.render("503");
  }
});
module.exports = router;
