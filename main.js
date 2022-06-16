global.__basedir = __dirname;

require('dotenv').config({path:"./.env"})
require("./scripts/aeriallaptop/aerialhelper");  
const cors = require("cors");
const express = require("express");
var colors = require('colors');
const app = express();
const optionDefinitions = [
  { name: 'configure', alias: 'c', type: Boolean }
]
const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)
const cliArgs = JSON.stringify(options);
const cliArgsParsed = JSON.parse(cliArgs);
if (cliArgsParsed.configure) {
require("./scripts/configure");
}
if (process.env.port == undefined) {
  console.log("X ".brightRed.bold+".env does not exist! Please run with the ".red+"--configure".brightRed.bgGray+" flag to generate it!".red);
  process.exit()
}

const controller = require("./scripts/control");

var corsOptions = {
  origin: `http://localhost:8081`
};
app.use(cors(corsOptions));
const initRoutes = require("./scripts/routing");
app.use(express.urlencoded({ extended: true }));
// Create static route for home page, assets and custom client distribution.
app.use(express.static('static'));
initRoutes(app);
app.set('view engine', 'ejs');
app.post('/uploadfile', controller.upload);
// Open app.
app.listen(process.env.port, () => {
  console.log(`FilingSaucer started successfully on port ${process.env.port}!`.green.bold);
  console.log(`To change configuration options, please run application with --configure`.green.italic);
});