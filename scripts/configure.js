var fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });
var colors = require('colors');
var colors = require('colors/safe');

var port = prompt("==> (8080) Port: ");
var url = prompt("==> (http://localhost) URL: ");
var forcePortRemovalInApp = prompt("==> (false) Force Port Removal: ");
var accessLimit = prompt("==> (40) How many times can /share, /view and /download be used per five minutes: ");
var apiLimit = prompt("==> (10) How many times can upload and /delete be used per fifteen minutes: ");
if (port == "") {port = 8080;}
if (url == "") {url = `http://localhost`;}
if (forcePortRemovalInApp == "") {forcePortRemovalInApp = false;}
if (accessLimit == "") {accessLimit = 40;}
if (apiLimit == "") {apiLimit = 10;}

var formatted = `port=${port}\nurl=${url}\nforcePortRemovalInApp=${forcePortRemovalInApp}\naccessLimit=${accessLimit}\napiLimit=${apiLimit}`
var createStream = fs.createWriteStream(`./.env`);
createStream.end();
fs.writeFileSync(`./.env`, formatted);
console.log("> ".green.bold+"Successfully created the configuration file: ".cyan+"./.env".blue);
console.log("> ".green.bold+`Filing Saucer has successfully been configured with the following options:\n${formatted}\n\n`+"> ".green.bold+`Filing Saucer will now exit. Please start without the --configure option to proceed to the application.`.cyan)
process.exit()