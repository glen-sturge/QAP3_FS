const Logger = require("../logger");
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  putProduct,
  patchProduct,
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
      `${res.statusCode}: (client@${req.socket.remoteAddress}) Problem retrieving product information: ${error}`
    );
  }
});

router.get("/api", async (req, res) => {
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
    res.json({ products });
    lg.emit(
      "log",
      "products.GET('/api')",
      "INFO",
      `${res.statusCode}: (client@${req.socket.remoteAddress}) Products succesfully recieved.`
    );
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
    lg.emit(
      "log",
      "products.GET('/api')",
      "ERROR",
      `${res.statusCode}: (client@${req.socket.remoteAddress}) Problem retrieving product information: ${error}`
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

router.get("/api/:id", async (req, res) => {
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
      res.status(404).json({ error: "No record found" });
    } else {
      res.json({ aProduct });
    }
  } catch {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("product.Delete : " + req.params.id);
  let aProduct = await getProductById(req.params.id);
  res.render("productDelete.ejs", { aProduct });
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("product.REPLACE : id=" + req.params.id);
  let aProduct = await getProductById(req.params.id);
  res.render("putProduct.ejs", { product: aProduct[0] });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("product.EDIT: id=" + req.params.id);
  let aProduct = await getProductById(req.params.id);
  res.render("patchProduct.ejs", { product: aProduct[0] });
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

router.post("/api", async (req, res) => {
  if (DEBUG) console.log("products.POST");
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_image,
      category_id,
    } = req.body;

    if (DEBUG) console.log("Data extracted from request body:", req.body);
    await addProduct(
      product_name,
      product_description,
      product_price,
      product_image,
      category_id
    );
    res.status(200).json({ info: `Succesfully added ${product_name}` });
  } catch {
    //logging here.
    res.status(503).json({ error: "Internal Server Error" });
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
    //logging here.
    res.render("503");
  }
});

router.put("/api/:id", async (req, res) => {
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
    res.json({
      info: `Succesfully replaced product (id=${req.params.id}) ${product_name}`,
    });
  } catch (error) {
    if (DEBUG)
      console.log(
        `There was an error replacing product data, product_id=${req.params.id}:\n${error} `
      );
    res.status(503).json({ error: "Internal Server Error" });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("product.PATCH: product_id=" + req.params.id);
  console.log("Request Body:", req.body);
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_image,
      category_id,
    } = req.body;

    const patchData = {};
    if (product_name !== undefined) patchData.product_name = product_name;
    if (product_description !== undefined)
      patchData.product_description = product_description;
    if (product_price !== undefined) patchData.product_price = product_price;
    if (product_image !== undefined) patchData.product_image = product_image;
    if (category_id !== undefined) patchData.category_id = category_id;

    await patchProduct(req.params.id, patchData);
    res.redirect("/products/");
  } catch (error) {
    if (DEBUG)
      console.log(
        `There was an error patching product data, product_id=${req.params.id}:\n${error} `
      );
    //logging here
    res.render("503");
  }
});

router.patch("/api/:id", async (req, res) => {
  if (DEBUG) console.log("product.PATCH: product_id=" + req.params.id);
  console.log("Request Body:", req.body);
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_image,
      category_id,
    } = req.body;

    const patchData = {};
    if (product_name !== undefined) patchData.product_name = product_name;
    if (product_description !== undefined)
      patchData.product_description = product_description;
    if (product_price !== undefined) patchData.product_price = product_price;
    if (product_image !== undefined) patchData.product_image = product_image;
    if (category_id !== undefined) patchData.category_id = category_id;

    await patchProduct(req.params.id, patchData);
    res.json({ info: `Succesfully patched product (id=${req.params.id})` });
  } catch (error) {
    if (DEBUG)
      console.log(
        `There was an error patching product data, product_id=${req.params.id}:\n${error} `
      );
    //logging here
    res.status(503).json({ error: "Internal Server Error" });
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

router.delete("/api/:id", async (req, res) => {
  if (DEBUG) console.log("products.DELETE: product_id=" + req.params.id);
  try {
    await deleteProduct(req.params.id);
    res.json({ info: `succesfully deleted product (id=${req.params.id})` });
  } catch (err) {
    if (DEBUG)
      console.log(
        `There was an error deleting record, product_id=${req.params.id}:\n${err}`
      );
    //logging here
    res.status(503).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
