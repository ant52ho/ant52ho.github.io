require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { server } = require("./app"); // init express server.
require("./socket/server"); // init socket server.

const port = process.env.PORT || 5000;
server.listen(port, "0.0.0.0", () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://0.0.0.0:${port}`);
  /* eslint-enable no-console */
});
