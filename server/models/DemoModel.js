const { Pool } = require("pg");
require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DEMO_URI,
// });

const pool = new Pool({
  connectionString: "postgres://buebvlsf:5HLTLKylKBdu5uR_2vhDuiZ6tajkkJC7@batyr.db.elephantsql.com/buebvlsf",
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
