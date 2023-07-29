const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qap3a",
  password: /*removed*/,
  port: 5432,
});
module.exports = pool;
