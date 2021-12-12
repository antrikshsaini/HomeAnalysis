const Pool = require("pg").Pool;

const pool = new Pool({
  user: "smarthomesdashboarduser@smarthomes",
  password: "b5zT;q_fS\\aAUtpD",
  host: "smarthomes.postgres.database.azure.com",
  port: "5432",
  database: "wattage",
  ssl: true,
}); 

module.exports = pool;
