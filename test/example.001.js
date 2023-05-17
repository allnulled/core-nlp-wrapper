(async () => {
    // Primero, tienes que tener el texto en un fichero:
    require("fs").writeFileSync("file.txt", "This is a simple text in a file, written in English, that will be easily parsed by this monster from Stanford.", "utf8");
    // Segundo, puedes pasarle el nombre del fichero al módulo:
    const analisis_gramatical = await require("core-nlp-wrapper")("file.txt");
    // Voilá, el análisis gramatical ha sido efectuado:
    console.log(analisis_gramatical);
})();