# `core-nlp-wrapper`

Análisis gramatical de texto.

## Instalación

```sh
npm i core-nlp-wrapper
```

Esto instalará el binario `parse_natural_file` y lo dejará usable desde línea de comandos.

## Completar la instalación

### El fichero perdido

Bueno, es un proyecto un poco especial, porque requiere de ficheros grandes. Y hay un problema: Github pone un límite de espacio por fichero para alojar. Y en el proyecto, hay 1 fichero que sobrepasa este límite. Ese fichero, en la instalación con `npm` de `core-nlp-wrapper`, no está incluído.

Por todo esto, hay que descargarse este zip de aquí:

  - 1) [http://nlp.stanford.edu/software/stanford-parser-4.2.1.zip](http://nlp.stanford.edu/software/stanford-parser-4.2.1.zip).
  - 2) Descomprimirlo.
  - 3) Copiar el fichero `stanford-parser-4.2.1-models.jar`.
  - 4) Pegarlo en el directorio `node_modules/core-nlp-wrapper/`.

Así, entonces, el comando de consola: `parse_natural_file file.txt` debería encontrar todos los ficheros que va a requerir del proyecto.

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

Desde un fichero js solo tienes que:

```js
(async () => {
    try {
        // Primero, tienes que tener el texto en un fichero:
        require("fs").writeFileSync("file.txt", "This is a simple text in a file, written in English, that will be easily parsed by this monster from Stanford.", "utf8");
        // Segundo, puedes pasarle el nombre del fichero al módulo:
        const analizador_gramatical = require("core-nlp-wrapper");
        const analisis_gramatical = await analizador_gramatical("file.txt");
        // Voilá, el análisis gramatical ha sido efectuado:
        console.log(analisis_gramatical);
    } catch(error) {
        console.log(error);
    }
})();
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

## Notas

Hace años que sé que existe este software. Simplemente, Castelog es: de lógico a natural. Esto es: de natural a lógico. Pero claro, la complejidad de esta segunda aproximación al tema, requiere de una historieta más grande y seria. ESO hace que uno sospeche más, claro, obvio. De que algo está sucediendo. De que *there's a natural mystic blowing through the air*. ¿O no? Es decir, Castelog era mucho más fácil, pero mucho más. ¬¬ ¿Hay gato encerrado?

No nos enfademos. Seamos amigos, universidades, omnisciencia.