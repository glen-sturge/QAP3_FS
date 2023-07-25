const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
} = require("../services/products.dal");

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
  } catch {
    res.render("503");
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
    if (DEBUG) console.log(product_name);
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

module.exports = router;
