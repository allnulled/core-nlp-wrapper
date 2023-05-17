(async () => {
    // También puedes pasarle el texto directamente con esta otra función:
    const modulo = __dirname + "/../core-nlp-wrapper";
    const texto = "This is a simple text in a file, written in English, that will be easily parsed by this monster from Stanford.";
    const analisis_gramatical = await require(modulo).parse_text(texto);
    // Voilá, el análisis gramatical ha sido efectuado:
    console.log(analisis_gramatical);
})();