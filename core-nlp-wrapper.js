const path = require("path");
const fs = require("fs");
const spawn = require("child_process").spawn;
const xml_js = require("xml-js");
const alfabeto_por_defecto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const un_texto_aleatorio = function (caracteres, alfabeto = alfabeto_por_defecto) {
    let output = "";
    for (let index = 0; index < caracteres; index++) {
        output += alfabeto[Math.floor(Math.random() * alfabeto.length)];
    }
    return output;
};
const CoreNPLWrapper = {};

CoreNPLWrapper.parse_file = function (file_arg, delete_file_afterwards = false) {
    const file = path.resolve(file_arg);
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
        ], {
            cwd: __dirname
        });
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
                    compact: false,
                    spaces: 2
                });
                return ok(json_data);
            } else {
                return fail(output);
            }
        });
    }).then(data => {
        if (delete_file_afterwards) {
            fs.unlinkSync(file);
        }
        return data;
    }).catch(error => {
        if (delete_file_afterwards) {
            fs.unlinkSync(file);
        }
        throw error;
    });
};

CoreNPLWrapper.parse_text = function (text) {
    const file = path.resolve("temporary-file-" + un_texto_aleatorio(10) + ".txt");
    fs.writeFileSync(file, text, "utf8");
    return CoreNPLWrapper.parse_file(file, true);
};

CoreNPLWrapper.default = CoreNPLWrapper;

module.exports = CoreNPLWrapper;