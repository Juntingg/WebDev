
const { getDate } = require("./COMP4537/labs/3/modules/utils");
const { writeFile, readFile } = require("./COMP4537/labs/3/modules/filesManager");
const { GREETING, PAGE_NOT_FOUND, BAD_REQUEST_FOR_EMPTY_TEXT } = require("./COMP4537/labs/3/lang/messages/en/user");
const url = require("url");
const querystring = require("querystring");

const BASE_PATH = "COMP4537/labs/3"
const FILE_NAME = "file.txt"

'use strict';
var http = require('http');
var fs = require('fs');

http.createServer(async (request, response) => {

    const parseUrl = url.parse(request.url);
    const pathname = parseUrl.pathname;
    const urlQueryParams = querystring.parse(parseUrl.query);
    console.log("pathname: " + pathname)

    if (pathname === `/${BASE_PATH}/getDate/`) {
        const name = urlQueryParams.name || "caroline";
        const currentTime = getDate();

        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(GREETING.replace("%1", name) + currentTime);

    } else if (pathname === `/${BASE_PATH}/writeFile/`) {
        const text = urlQueryParams.text || "";

        if (text.trim() === "") {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.end(BAD_REQUEST_FOR_EMPTY_TEXT);
            return;
        }

        await writeFile(`${BASE_PATH}/${FILE_NAME}`, text);
        response.end(`"${text}" have been written into the file`);

    } else if (pathname === `/${BASE_PATH}/readFile/${FILE_NAME}`) {
        // const text = urlQueryParams.text || "";
        // if (text.trim() === "") {
        //     response.writeHead(404, { "Content-Type": "text/html" });
        //     response.end(BAD_REQUEST_FOR_EMPTY_TEXT);
        //     return;
        // }
        let content;
        try {
            content = await readFile(`${BASE_PATH}/${FILE_NAME}`);
            if (content === "") {
                content = PAGE_NOT_FOUND;
            }

        } catch (error) {
            console.error("Error reading file:", error);
        }
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(content);

    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end(PAGE_NOT_FOUND);

    }



}
).listen(8080);

console.log('listening on 8080...');
