const dal = require("./db");

const getCategories = () => {
  if (DEBUG) console.log("category.dal.getCategories()");
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT category_id, category_name, category_description, category_image FROM category\
                ORDER BY category_id ASC;";
    dal.query(sql, [], (err, result) => {
      if (err) {
        //logging here
        if (DEBUG) console.log("Error retrieving category data: " + err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getCategories,
};
