
const { getDate } = require("./COMP4537/labs/3/modules/utils");
const { GREETING } = require("./COMP4537/labs/3/lang/messages/en/user");
const url = require("url");
const querystring = require("querystring");


'use strict';
var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    // request.n = numberOfRequests;

    const parseUrl = url.parse(request.url);
    const urlQueryParams = querystring.parse(parseUrl.query);

    const name = urlQueryParams.name || "caroline";

    const currentTime = getDate();
    console.log(GREETING.replace("{name}", name).replace("{date}", currentTime));

    response.writeHead(200, { 'Content-type': 'text/plain' });
    response.write(GREETING.replace("{name}", name).replace("{date}", currentTime));
    response.end();

    
}
).listen(8080);

console.log('listening on 8080...');
