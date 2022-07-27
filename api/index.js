const server =require("./App.js")
const {conn} = require("./src/DB/db.js")

const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
