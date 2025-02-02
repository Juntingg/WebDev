const fs = require("fs").promises;
const path = require("path");

exports.writeFile = async (filePath, text) => {
    console.log(filePath)
    try {

        await fs.appendFile(filePath, text + "\n");
    } catch (error) {
        throw new Error("fail to write");
    }
};

exports.readFile = async (filePath) => {
    console.log(filePath)
    try {

        const content = await fs.readFile(filePath, "utf-8");
        return content;
    } catch (error) {
        return "";
    }
};
