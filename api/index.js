const server = require("./App.js");
const { conn } = require("./src/DB/db.js");

const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
  });
});
