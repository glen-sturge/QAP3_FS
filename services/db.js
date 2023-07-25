const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "qap3",
  password: "!N00bt00b",
  port: 5432,
});
module.exports = pool;
