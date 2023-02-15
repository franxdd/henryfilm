const server = require("./App.js");
const { conn } = require("./src/DB/db.js");

// const PORT = process.env.PORT;

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
