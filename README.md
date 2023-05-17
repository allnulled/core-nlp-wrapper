# `core-nlp-wrapper`

Análisis gramatical de texto.

## Instalación

```sh
npm i core-nlp-wrapper
```

Esto instalará el binario `parse_natural_file` y lo dejará usable desde línea de comandos.

## Completar la instalación

Primero, situar la página donde están todas las versiones históricas de este software. Y es aquí:

  - [https://stanfordnlp.github.io/CoreNLP/history.html](https://stanfordnlp.github.io/CoreNLP/history.html)

Nosotros, en un primer momento, estamos usando la versión `4.2.1`.

### El fichero perdido

Bueno, es un proyecto un poco especial, porque requiere de ficheros grandes. Y hay un problema: Github pone un límite de espacio por fichero para alojar. Y en el proyecto, hay 1 fichero que sobrepasa este límite. Ese fichero, en la instalación con `npm` de `core-nlp-wrapper`, no está incluído.

Por todo esto, hay que descargarse este zip de aquí:

  - 1) [http://nlp.stanford.edu/software/stanford-parser-4.2.1.zip](http://nlp.stanford.edu/software/stanford-parser-4.2.1.zip).
  - 2) Descomprimirlo.
  - 3) Copiar el fichero `stanford-parser-4.2.1-models.jar`.
  - 4) Pegarlo en el directorio `node_modules/core-nlp-wrapper/`.

Así, entonces, el comando de consola: `parse_natural_file file.txt` debería encontrar todos los ficheros que va a requerir del proyecto.

### El fichero para castellano

Para este proyecto, creo que no voy a dar soporte en castellano, tristemente. Creo que en castellano no está tan bien hecho, tristemente. Quería hacerlo, pero me temo que no es tan buena idea, y que mejor se queda en inglés. Al menos, este.

### El binario de Java

CoreNLP funciona con Java. Para que todo funcione bien, no estoy seguro de cuántas cosas hay que tener. En principio, dicen, solo Java 8 o 9. Supongo que mayor también. Al final he conseguido hacerlo funcionar así así, pero no con **Gradle** ni con **Maven**, sino bajándome la versión *"standalone"* del proyecto de su página web, aquí concretamente: [https://stanfordnlp.github.io/CoreNLP/parser-standalone.html](https://stanfordnlp.github.io/CoreNLP/parser-standalone.html). Entonces, si abres el fichero `README.txt`, que es parte de su proyecto y no del mío, ves la instrucción para hacerlo funcionar por consola. Ahí puedes encontrar más cosas de cómo funciona el programa que ellos dan.

## Proyecto extendido

Todos los ficheros de este proyecto son los suyos. Yo sólo he añadido:
  - `README.md`, que es este fichero.
  - `core-nlp-wrapper.js`, que es la función que parsea un fichero y te devuelve la estructura, como módulo para node.js.
  - `core-nlp-wrapper.bin.js`, que es el binario que se puede usar por consola mediante `parse_natural_file file.txt`.
  - `package.json`, en su proyecto no usan node.js para nada, por eso este fichero sí es nuestro. También lo usamos para importar una librería que nos permite pasar XML a JSON de NPM, porque su prorgama nos devuelve un XML para representar la estructura.

## Ejecución vía consola

```sh
parse_natural_file file.txt > file.json
```

En `file.txt` va un texto en inglés en un fichero de texto plano.

En `file.json` encontraremos la salida del procesamiento, en un JSON, que representa un XML, que representa la base de un análisis gramatical.

## Ejecución vía API de Node.js

Puedes analizar textos: (o ver `test/example.002.js`)

```js
const analizador_gramatical = require("core-nlp-wrapper");
const analisis_gramatical = await analizador_gramatical.parse_text("This sentence should be parsed blazing fast by the library.");
console.log(analisis_gramatical);
```

Y puedes analizar ficheros: (o ver `test/example.001.js`)

```js
// 1: Preparas el fichero
const fs = require("fs");
const file = "file.txt";
const text = "This is a simple text in a file, written in English, that will be easily parsed by this monster from Stanford.";
fs.writeFileSync(file, text, "utf8");

// 2: Lo analizas
const analizador_gramatical = require("core-nlp-wrapper");
const analisis_gramatical = await analizador_gramatical.parse_file(file);

console.log(analisis_gramatical);
```

## Tabla de categorías

| ID | Categoría |
|----|----|
| root | root |
| dep | dependent |
| aux | auxiliary |
| auxpass | passive auxiliary |
| cop | copula |
| arg | argument |
| agent | agent |
| comp | complement |
| acomp | adjectival complement |
| ccomp | clausal complement with internal subject |
| xcomp | clausal complement with external subject |
| obj | object |
| dobj | direct object |
| iobj | indirect object |
| pobj | object of preposition |
| subj | subject |
| nsubj | nominal subject |
| nsubjpass | passive nominal subject |
| csubj | clausal subject |
| csubjpass | passive clausal subject |
| cc | coordination |
| conj | conjunct |
| expl | expletive (expletive “there”) |
| mod | modifier |
| amod | adjectival modifier |
| appos | appositional modifier |
| 11advcl | adverbial clause modifier |
| det | determiner |
| predet | predeterminer |
| preconj | preconjunct |
| vmod | reduced, non-finite verbal modifier |
| mwe | multi-word expression modifier |
| mark | marker (word introducing an advcl or ccomp |
| advmod | adverbial modifier |
| neg | negation modifier |
| rcmod | relative clause modifier |
| quantmod | quantifier modifier |
| nn | noun compound modifier |
| npadvmod | noun phrase adverbial modifier |
| tmod | temporal modifier |
| num | numeric modifier |
| number | element of compound number |
| prep | prepositional modifier |
| poss | possession modifier |
| possessive | possessive modifier (’s) |
| prt | phrasal verb particle |
| parataxis | parataxis |
| goeswith | goes with |
| punct | punctuation |
| ref | referent |
| sdep | semantic dependent |
| xsubj | controlling subject |
