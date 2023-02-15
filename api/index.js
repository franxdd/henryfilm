const server = require("./App.js");
const { conn } = require("./src/DB/db.js");
require('dotenv').config();
const {PORT} = process.env;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
  });
});
