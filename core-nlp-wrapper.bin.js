#!/usr/bin/env node

const main = async function() {
    try {
        const path = require("path");
        const api_file = path.resolve(__dirname, "core-nlp-wrapper.js");
        const CoreNLPWrapper = require(api_file);
        const output = await CoreNLPWrapper.parse_file(process.argv[2]);
        console.log(output);
    } catch(error) {
        console.log(error);
    }
};

main();