const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  connectionString: "postgres://ieywzzsr:ZmQLNaO6jeKwON_LhS0sfl649xLDKzkP@ruby.db.elephantsql.com/ieywzzsr"
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
