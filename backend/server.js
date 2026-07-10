require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const dns = require('dns')

dns.setServers(['1.1.1.1'])

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`connected to server on port ${process.env.PORT}...`);
});
 