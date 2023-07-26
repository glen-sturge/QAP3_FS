const dal = require("./db");

//get all products
const getProducts = () => {
  if (DEBUG) console.log("products.dal.getProducts()");
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT product_id, product_name, product_description, product_price, product_image, category_id FROM product\
            ORDER BY category_id\
            ,product_id ASC;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        //logging here
        if (DEBUG) console.log("Error executing query: " + err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getProductById = (id) => {
  if (DEBUG) console.log("products.dal.getProductById()");
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT product_id, product_name, product_description, product_price, product_image, category_id FROM product WHERE product_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        //logging here
        if (DEBUG) console.log("Error executing query: " + err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const addProduct = (
  product_name,
  product_description,
  product_price,
  product_image,
  category_id
) => {
  if (DEBUG) console.log("products.dal.addProduct()");
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO product (product_name, product_description, product_price, product_image, category_id) \
        VALUES ($1, $2, $3, $4, $5);";
    dal.query(
      sql,
      [
        product_name,
        product_description,
        product_price,
        product_image,
        category_id,
      ],
      (err, result) => {
        if (err) {
          //logging here
          if (DEBUG) console.log("Error executing query: " + err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const deleteProduct = (product_id) => {
  if (DEBUG) console.log("products.dal.deleteProduct()");
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM product WHERE product_id = $1;";
    dal.query(sql, [product_id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
};
