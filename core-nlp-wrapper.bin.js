#!/usr/bin/env node

const main = async function() {
    try {
        const path = require("path");
        const api_file = path.resolve(__dirname, "core-nlp-wrapper.js");
        const parse_file = require(api_file);
        const output = await parse_file(process.argv[2]);
        console.log(output);
    } catch(error) {
        console.log(error);
    }
};

main();