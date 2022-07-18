const server =require("../../App.js")
const {conn} = require("../DB/db.js")


conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
  
