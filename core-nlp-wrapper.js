const fs = require("fs");
const spawn = require("child_process").spawn;
const xml_js = require("xml-js");

const parse_file = function (file) {
    if (!fs.existsSync(file)) {
        throw new Error(`Required «file» to exist (${file})`);
    }
    return new Promise((ok, fail) => {
        const output = { success: "", error: [] };
        const subprocess = spawn("java", [
            "-mx200m",
            "-cp",
            __dirname + "/*:",
            "edu.stanford.nlp.parser.lexparser.LexicalizedParser",
            "-outputFormat",
            "xmlTree",
            "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz",
            file
        ], { cwd: __dirname });
        subprocess.stdout.on("data", (data) => {
            output.success += `${data.toString()}`;
        });
        subprocess.on("error", (data) => {
            output.error.push(data.toString());
            return fail(output);
        });
        subprocess.on("close", (code) => {
            if (code === 0) {
                output.success = `<file path=${JSON.stringify(file)}>${output.success}</file>`;
                const json_data = xml_js.xml2json(output.success, {
                    compact: true,
                    spaces: 2
                });
                return ok(json_data);
            } else {
                return fail(output);
            }
        });
    });
};

parse_file.default = parse_file;

module.exports = parse_file;