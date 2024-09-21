# Aplicación para entender mejor como funcionan los frameworks web

Esta aplicación nos va a servir para entender mejor como funciona un framework de tecnologías web. Nosotros vamos a usar React, y por tanto nos vamos a basar un poco en ese framework, sin embargo todos funcionan de forma más o menos similar, por lo que las problemáticas que vamos a plantear y a solucionar aplican a cualquier framework.

Vamos a trabajar con una simple app de mensajería. La idea es poder simular como dos usuarios (Alice y Bob) chatean por la aplicación. Para la aplicación vamos a simular la interacción con un servidor pero de forma completamente local. Es decir, en ningún momento vamos a tener que envíar o recibir información de un servidor, sino que vamos a generar mensajes de forma aleatoria, simulando la llegada de los mismos a mi aplicación, y vamos a agregar todo en un contexto local.

El problema de conctarnos a un servidor es algo que no vamos a resolver por ahora, ya que implica otras tecnologías que, si bien se suelen utilizar en conjunto con frameworks web, no son lo mismo. Queremos mantener bien separadas las capas para evitar mezclar conceptos.

La aplicación de chat es interesante, porque nos presenta algunos desafíos que iremos viendo en cada etapa del codigo.

Recordemos algunas tecnologías que necesitamos conocer antes de comenzar:
* **HTML (Hypertext Markup Language)**: Es un lenguaje de marcado que se usa para definir la estructura y contenido de un sitio web. Utiliza el concepto de **etiqueta**, como forma de marcar contenido. Las etiquetas abren y cierran, pudiendo contener dentro otras etiquetas o texto, formando efectivamente una estructura de árbol. Además las etiquetas pueden contener **atributos** que dan más información sobre la marca.
* **CSS (Cascade Style Sheets)**: Es un lenguaje que sirve para dar estilo a los distintos elementos definidos en el árbol de etiquetas. Se basa en un conjunto de **query selectors** (una forma de identificar a uno o más de los elementos del árbol de etiquetas) seguido de reglas para cada uno de ellos, dadas por un conjunto de pares clave-valor.
* **JavaScript (JS)**: Es un lenguaje de programación que corre de forma nativa gracias a un motor del lenguaje (engine javascript) que incluyen los navegadore web. El lenguaje permite generar sitios web dinámicos, aunque hoy también puede usarse para hacer programas que corran en máquinas del usuario, ervidores e incluso dispositivos embebidos.
* **DOM (Document Object Model)**: Es un modelo de objetos que representa el árbol de etiquetas del documento HTML asociado. Es una de las APIs principales que utiliza JavaScript en el navegador, ya que al modificar el DOM el navegador actualiza automáticamente el HTML. Esto nos permite efectivamente manipular los contenidos de una página web con JS. Los cambios que se hagan, obviamente, son transientes, y se pìerden al recargar la página.


## Etapa 0: Entendiendo las problemáticas

Comencemos por intentar comprender el problema que queremos resolver.

### Problemas de un modelo cliente-servidor

Imaginemos que vamos a encarar la app con HTML plano y llano. Surge inmediatamente un problema: El contenido de una app de chat, no puede ser estático, ya que los mensajes deben visualizarse "en tiempo real".

Alguno podría argumentar que se puede lograr interactividad con un modelo cliente-servidor. Basta hacer que la app tenga un formulario que efectivamente envíe al servidor, y que este responda con el nuevo HTML a mostrar. Este es el modelo que siguió la web desde sus comienzos para lograr que el cliente pueda enviar información al servidor y el servidor responderle.

Esto, si bien es cierto, implica recargar constantemente la página, con el tiempo de espera que ello implica para el usuario. Si bien hoy en día contamos con máquinas capaces de realizar el renderizado (visualización) del HTML de forma rápida, y conexiones muy veloces, no es una realidad para todos, ya que hay lugares con conectividad lenta, o personas con máquinas no tan potentes.

Además, puedo recargar la página al enviar un mensaje, pero, ¿Cómo sé si llegaron mensajes nuevos? Si o si estoy forzado a recargar la página cada cierto tiempo para poder saber si hay mensajes nuevos del otro lado.

Por último, la transferencia de archivos que este modelo implica es demasiado grande, ya que todo el HTML, las imagenes, etc. se transfiren una y otra vez entre el servidor y el cliente. Imaginemos conexiones en donde se cobra por cantidad de datos transferidos (como las conexiones móviles). En un modelo así, estamos forzando al usuario a pagar grandes costos por un diseño pobre.

Podemos concluir que no es un sistema viable utilizando HTML plano y un servidor. Se necesitan nuevas tecnologías.

### Como encarar la solución

Este tipo de problemas eran solucionados hace unos años por otros lenguajes, como Java o Flash. Pero desde que JavaScript logró transformarse en un estándar, y mejoró sus APIs con nuevos elementos, pasó a ser una gran opción. En la web moderna, vamos a necesitar si o si de JS para poder escribir nuestra aplicación, ya que queremos que sea dinámica.

Ojo, hay un beneficio en haber planteado el HTML y el CSS necesario de nuestra aplicación, que quedará en evidencia más adelante. Ya tenemos la estructura báse de nuestra app en términos de interfaz. Esta estructura nos servirá como guía al momento de hacer que nuestra aplicación se vuelva dinámica.

Veamos como sigue...


## Etapa 01: Agregando JS

Como dijimos, vamos entonces a necesitar JS para hacer nuestra app dinámica.
Pero no lo vamos a agregar todo en un solo archivo. Vamos a separar las cosas en 2 partes bien claras:

### Lógica

La lógica de la aplicación estará de momento contenida en un archivo `logica.js` y tendrá únicamente comportamiento sobre cómo funciona la aplicación. Es decir, de ninguna forma va a interactuar con la interfáz gráfica.

Acá nos vamos a encargar pura y exclusivamente de modelar los elementos que componen a la lógica de mi aplicación, es decir, los datos, el comportamiento y funciones útiles que permiten enviar y recibir mensajes.

En este archivo sería donde colocaríamos la lógica necesaria, no solo para manipular los datos, sino también para conectarnos con un servidor y enviar o recibir información. Recordemos, sin embargo, que esto último será simulado.

Este archivo por ahora basta con pegarle una leída, pero no lo vamos a tocar mucho. Sin embargo, tengamos presente que el objetivo es lograr utilizar la lógica que en este se dispone.

### Interfaz

El archivo `ui.js` es el que va a contener la interfaz gráfica del sistema.
Este archivo va a "crear" la aplicación en sí, en terminos visuales. Todos los elementos gráficos van a estar ahí.

Por otro lado, también va a contener (eventualmente) la lógica de lo que sucede cuando apretamos un botón en la interfáz, o modificamos cierto texto.

El código real de la aplicación va a estar acá. EL HTML se transforma entonces en un cascarón vacío, que simplemente tiene un único elemento, un div con un id claramente identificable, sobre el cual vamos a agregar mediante manipulación del DOM la totalidad de la interfáz (Si bien en nuestro HTML hay algunos otros componentes, que usamos simplemente para que se puedan navegar por los diversos ejemplos, pero estos no forman parte en absoluto de la aplicación, y tranquilamente los podríamos eliminar).

El HTML se va a encargar también de un detalle muy importante, cargar los scripts tanto de la lógica del programa, como de la interfaz. Adicionalmente vamos a cargar estilos y otros elementos generales allí, pero si lo miramos, se vuelve muy simple.

Toda la interfaz real, va a estar entonces en `ui.js`, y se va a "crear" desde JS.

Para crear la app, vamos a usar la idea de "componente". Un componente no es más que una función, aunque lo que se espera es que dicha función pertenezca pura y exclusivamente el mundo de las interfaces. Distintos frameworks tendrán distintas conceptualizaciones de la idea de componente, pero en escencia siempre es la misma idea, algún tipo de función que se encarga de definir el contenido a mostrar en la pantalla.

En algunos frameworks, e incluso en versiones más antiguas de react, se usaban clases. En JavaScript, las clases son un agregado reciente, puesto simplemente como azucar sintáctico. A bajo nivel, una clase no es más que una función. React por ejemplo, optó por eliminar completamente el soporte de clases, e ir por funciones puras (hay algunos detalles del por qué, que no vamos a ver ahora), mientras que otros frameworks siguen usando clases.

Nosotros vamos a definir funciones simples, que van a tomar en principio un único parámetro, el elemento del DOM sobre el cual agregar los contenidos del componente. Así, cada componente va a realizar una serie de pasos bastante estandarizados:
* Va a recibir por parámetro un elemento del DOM donde renderizarse.
* Va a crear nuevos elementos del DOM y configurar sus atributos y texto (si tuvieran)
* Va a vincular todos los elementos creados entre sí en una relación de árbol, diciendo que componentes son hijos de que otros componentes.
* Va a agregar uno o varios de esos elementos creado al elemento del DOM recibido por parámetro.

Adicionalmente, puede que un componente incluya otros componentes. En estos escenarios, el componente simplemente va a llamar a la función que representa el componente a incluir, y le va a pasar un elemento del DOM en donde se espera que se agregue el contenido. Ese elemento del DOM puede ser el mismo recibido por parámetro, o algún nuevo elemento del DOM creado por el componente.

### Por qué hacer toda la UI en JS

Se podría elegir no hacer el total de la interfaz en JS, sino hacer partes en JS y partes en HTML. Es un modelo perfectamente válido. Sin embargo, es más complejo, pues es dificil integrar contenido JS en el HTML.

Muchos frameworks que recurrían a esta técnica usaban algun tipo de pre o post procesado del HTML, haciendo un gran uso de leer el texto que compone al HTML (un string grande) y reemplazando partes por resultados de código. Esto requiere herramientas adicionales a las que nos provee el navegador, que deben ser instalados en nuestro equipo, generando un paso de "compilación" previo a poder hacer funcionar nuestra app, o en el caso del post-procesado, agregando un gran overhead a nuestro código.

La aparición de algunas tecnologías de HTML 5 dió lugar a que se pueda hacer interfaces de forma eficiente completamente en JS, lo que simplifica muchisimo el proceso de desarrollo. React por ejemplo, sigue esa filosofía, utilizando tecnologías como el [SHadow DOM](https://developer.mozilla.org/es/docs/Web/API/Web_components/Using_shadow_DOM). No vamos a hacer algo tan complejo, pero si vamos a crear la totalidad de nuestra interfaz usando JS.

El tener todo en JS nos va a simplificar el proceso de desarrollo, centralizando el punto en donde se genera la interfaz. Por otro lado, nos va a permitir ener la idea de componente.


## Etapa 02: Una library para la UI

En esta etapa vamos a crear un archivo que va actuar de library para ayudarnos a
definir los elementos de la interfaz.

### createElement personalizado

Si analizamos el código de UI al momento, vamos a encontrarnos que todos los componentes se comportan de forma muy parecida. Van creando varios elementos del DOM, asignan varios atributos a los mismos, y luego se vinculan entre si en una relación de árbol, donde un padre contiene a varios hijos. Luego, en cada componente, se finaliza con agregar uno de estos elementos del DOM a un elemento del DOM que recibieron como parámetro.

La idea general de esta etapa es crear una library que me permita generalizar esos pasos en una función más simple, y allí es donde aparece nuestra función `createElement`. No debemos confundir esta versión de la función con la que nos provee `document`, que solo toma un argumento, y crea un elemento del DOM. Nuestra función es más compleja (aunque utiliza internamente la de `document`), ya que nos va a permitir crear el elemento, asignar argumentos y vincular hijos en un solo paso, devolviendo como resultado el elemento finalmente creado con todos vinculado.

Los componentes siguen siendo funciones. Pero surge un problema, ahora muchas veces, dentro de la lista de hijos de un elemento del DOM, vamos a querer un componente. Pero la lista de hijos espera, o bien un string, o bien un array de elementos del DOM. Más aún, cuando un componente está en la lista de hijos, el padre de dicho componente debe ser el que `createElement` está definiendo, por lo que deberá invocarse al componente/función desde `createElement`, ya que es el único que tiene registro del elemento que se está creando.

El problema no es grave, hasta que llegamos al caso de funciones que esperan, no solo al padre, sino otros argumentos, como el caso de `MessageContainer` o `Message` que esperan `side`. ¿Cómo dar esa información? Para solucionar ese problema podemos hacer uso de la curryficación, definiendo una función que luego devuelve otra función. Así, la función que pasamos como hijo siempre tiene la misma forma, espera un único elementp.

### Haciendo el contenido global

JS tiene un objeto global, llamado `window`. Si definimos una función o una variable usando `var`, en el top-level de un script, esa definición pasará a existir de forma global para todos los otros scripts que sean cargados en el HTML.

Esto puede ser contraproducente. Dos funciones con el mismo nombre, en distintos scripts, pueden colisionar, causando efectos silenciosos, pero indeseados.

Por suerte, HTML y JS en sus últimas versiones incluyeron la posibilidad de definir un script como "modulo", que se comportan de forma ligeramente diferente, algo que definimos al momento de importar el script. Al crear un const o un let, estos viven solamente en el modulo que los define, que, para JS, se trata del script o archivo que los define.

Esto nos da la posibilidad de crear definiciones que vivan solo en nuestro script, y hacerlas globales, solo si queremos. Para hacer una asignación global, basta realizar una asignación a un atributo de `window` (con la idea de que no deberíamos usar un atributo que ya está siendo utilizado). En la library de UI que creamos usamos esta técnica, logrando entonces exportar nuestra función `createElement` para ser usada en otros scripts.


## Etapa 03: Mejorando la library

En esta etapa vamos a hacer que nuestra library de UI trabaje de forma más uniforme entre elementos del DOM y componentes.

### Eliminando la curryficación

El primer paso para uniformizar nuestra library va a ser mejorar la forma en la que trabajamos con componentes. Si podemos eliminar el paso de pasar al parent a cada componente, podemos eliminar esas funciones curryficadas, que tanto ruido hacen y generan confusión. Podemos hacerlo fácilmente, delegando el trabajo de agregar el componente a la misma función `createElement`.

Esto es sencillo, porque de hecho, ya se está haciendo para los elementos del DOM. Entonces, basta hacer que nuestros componentes, en lugar de ser procedimientos (y no devolver nada), sean funciones, y devuelvan un elemento del DOM, el componente a agregar al parent. Entonces, al hacer:

```js
createElement('div', {
    'class': 'w-100 d-flex flex-column p-2'
}, [
    MessagesListBox(),
    SendMessageBox(),
]);
```

El resultado de invocar a `MessagesListBox`, es un elemento del DOM, y por tanto se agrega directamente, cual si fuera cualquier otro elemento del DOM.

### Funciones para iniciar la aplicación

Por otro lado, si miramos la versión anterior de la UI, veremos que todas las funciones terminan currificadas, menos una, App. App es especial, ya que es la primer función que llamo para iniciar la aplicación, y por eso tiene que tener una forma distinta.

Podemos dar un paso más, y crear una función en la library que se encargue de ese paso. Una función a la que le pase un elemento del dom y un componente, y se encargue de realizar los pasos para que todo arranque.

Por ahora puede sonar a capricho, pero veremos más adelante el gran impacto que tiene este paso. Por otro lado, penseos que en una library más compleja, puede que hayan varios pasos a realizar antes de establecer el primer componente. Nosotros de hecho, vamos a agregar un paso, que consiste en asegurarnos que el componente del DOM donde arranca la aplicación, esté vacío (o más bien dicho, vaciarlo sin miramientos antes de arrancar).

Lo que vamos a hacer es crear una función `createRoot` a la cual le vamos a pasar un elemento del DOM (Nuestro div con id root) sobre el cual queremos renderizar la totalidad de la aplicación. El resultado va a ser un objeto que tiene una función render, a la cual le podemos pasar un componente como argumento, siendo este el elemento que se montará sobre nuestro div. Este modelo es ligeramente distinto al de React, que permite pasar un componente o un elemento del DOM, siendole indistinto. Nosotros no podemos hacer eso con nuestra simple implementación.

Adicionalmente vamos a guardarnos la información de la aplicación, es decir, sobre que elemento se montó la aplicación, y que fue lo que se renderizó. Esto va a ser útil más adelante.

### Simulando importar y exportar

Ahora que nuestra library tiene más funciones, podríamos seguir sumando a window más y más atributos, haciendo que las funciones que requerimos sean globales. Pero estaríamos llenando a `window` de atributos, algo que, como dijimos, no es una buena práctica.

Una mejor opción es asignar a un campo de `window` únicamente un objeto, que represente a todos los elementos que el modulo o library "exporta". Luego, desde otro script, podemos utilizar ese objeto como elemento global.

En nuestro caso, la library va a asignar a `window` un único objeto en el atributo `UILibrary`. Este objeto tendrá como atributos a las funciones `createElement`, `createRoot`, etc. Incluso podemos agregar en el futuro más y más funciones, pero sin que impacte en `window`, ya que todo está centralizado en ese objeto.

La forma de utilizar las funciones ahora sería mediante el uso de `UILibrary`, debiendo escribir algo como `UILibrary.createElement`.

Pero podemos llevar todo un paso más allá. Desde el archivo `ui`, en lugar de usar directamente el valor global en window, puedo asignar una variable al comienzo del archivo, con el nombre que desee, por ejemplo `UI` y asignarle a esta variable el elemento global que la library de UI "exporta".

De esta forma pasamos a tener un modelo de "exportación" e "importación". Un script, como la library, puede exportar solo ciertos elementos, y dejar otros como elementos de uso interno, mientras que otro script, como el de la UI, puede "importar" solo aquellos elementos que le sean relevantes.

No es un sistema de importación/exportación avanzado ni prolijo, ya que aún con todo seguimos "ensuciando" ligeramente a `window`, sumado a que debemos saber con qué nombre se guarda el campo en ese objeto para realizar la importación, y cargar los scripts en el HTML en cierto orden para que las cosas funcionen. Un sistema avanzado permitiría mencionar el archivo a importar, por nombre de archivo, y evitaría contaminar el contenido de `window`, así como también me permitiría trabajar con un sistema más simple en el HTML en donde no me importe el orden. Nuestro sistema de importación y exportación no es bueno, pero será útil por ahora.

Este tipo de soluciones de importación/exportación no existían en el navegador y de hecho aún hoy no son tan usadas, aunque comienzan a aparecer. Implican un overhead que nadie quiere asumir. En general, lo que se usa es algún tipo de pre-procesado del JS, en donde tengo archivos que usan import o require, y luego son procesados por una herramienta para transformarlos en un único script en donde todo está en el mismo lugar, pero evitando colisiones, etc. mediante el renombre apropiado de los elementos si correspondiera. Este tipo de herramientas se llaman **bundlers**, y existen varias, como Webpack, Rollup, Vite, etc. No vamos a usar ninguno por ahora.


## Etapa 04: Asignación desestructurada

El sistema de imports/exports que simulamos está relativamente bien, pero es engorroso tener que mencionar a `UI` todo el tiempo. Las funciones globales tenían su encanto.

Podemos sin embargo, trabajar en nuestra interfaz cual si la library hubiera exportado las funciones de forma global gracias al concepto de [asignación desestructurada](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

La asignación desestructurada permite asignar multiples variables en un único paso. Por ej.

```js
let [a, b] = [10, 20];
```

También podemos usarlo para objetos, con la salvedad de que en este tipo de desestructuración, la variable se debe llamar igual que el atributo del objeto:

```js
let { a, b } = { a: 'Hola', b: 'Mundo' };
```

Es una forma fácil de "romper" un objeto en sus partes, y quedarme con ellas, siempre y cuando conozca la estructura del objeto. Actúa de forma muy similar (pero no idéntica) al pattern matching en algunos escenarios.

Podemos llevar eso a nuestra interfáz, y en lugar de usar una constante para la `UILibrary` romper el objeto, obteniendo las partes que nos son relevantes:

```js
const { createElement, createRoot } = window.UILibrary;
```

Así, mejoramos nuestro sistema de importación, generando una especie de importaciones por nombre (named imports).

Este es el único cambio por ahora, veamos como sigue...


## Etapa 05: Generalizando componentes con props

Por ahora nuestros componentes funcionan, pero presentan contenido estático. Todos los mensajes son iguales, y siempre mostramos cinco mensajes. Tampoco hay interacción, pero para eso, aún nos falta un poco de trabajo.

### Haciendo que los componentes reciban más información

Lo primero que vamos a querer lograr es que nuestra aplicación no muestre siempre el mismo mensaje, sino tener diversos mensajes, distintos entre sí. Claro que tener varios componentes distintos no es una opción. ¿Cómo solucionar el problema entonces?

Ya hemos logrado que algunos de nuestros componentes cambien su forma en base a un parámetro. En base a esto cambiamos algunos atributos. De la misma forma podemos pasar más parámetros y usarlos en el texto a mostrar.

Sin embargo, si bien es viable tomar tres o cuatro parámetros, a medida que nuestros componentes crecen se empieza a volver complejo manejar tantos argumentos, en especial en un contexto donde un mismo componente puede ser utilizado desde multiples lugares. Al cambiar los parámetros, agregando o quitando uno, por la característica posicional de los mismos, se debe modificar todos los lugares de invocación.

JavaScript, sin embargo, hace muy facil simular la idea de pasar mucha información a una función, utilizando un único parámetro, mediante el uso de objetos. Como los objetos pueden crearse en el momento, basta usar un único objeto con múltiples atributos, y en cada atributo colocar la información que se desea. Luego, dentro de la función, se accede a los valores usando el parámetro y accediendo a los distintos atributos.

```js
function f(p) {
    p.attr1;
    p.attr2;
    ...
}

f( { attr1: 'Valor 1', attr2: 'Valor 2' } );
```

Notar las llaves luego de los paréntesis en la invocación. El argumento que estamos usando es un y solo un objeto, con múltiples atributos. Por tanto en la función hay un único parámetro. Sin embargo, luego en la función podemos acceder uno a uno los atributos.

Este modelo es muy escalable y útil, y por tanto, varios frameworks web, incluido React, suelen optar por este modelo para pasar información a los componentes.

### Las props y el pasaje de información

Al único parámetro de un componente, React lo denomina "propiedades" o simplemente "props", si bien el nombre del parámetro podría ser cualquiera. Vamos a seguir este mismo modelo, y hacer que nuestros componentes reciban un único argumento, y en principio vamos a usar el nombre "props" para el parámetro.

Las "props" permiten pasar información, desde el que invoca a la función, a la función invocada. En términos de componentes, esto implica pasar información desde los componentes padres a los componentes hijos.

A su vez, los hijos pueden usar la totalidad de esa información, o solo parte, o incluso no utilizarla. Y a su vez, pueden pasar la totalidad o parte de la información a sus propios hijos. Efectivamente funcionan igual que los parámetros que ya conocemos de las funciones, pues no son más que eso.

### Agregando props a nuestra UI

Notar que nuestra library, por el momento, no debe ser modificada, solo debemos cambiar los componentes y la información que pasamos. En este caso, vamos a pasar información desde la aplicación y llegando esta a los mensajes.

Algunas cosas útiles a tener en cuenta, es que podemos aprovechar el total del poder de JS para trabajar con los datos, pudiendo por ejemplo, usar funciones de alto orden, como `map` o `filter` para transformar listas de datos en listas de componentes que pueden ser utilizadas en nuestra interfaz, o utilizar alternativas con esos datos para generar distinto comportamiento.


## Etapa 06: Uniformizando DOM y componentes

Por ahora tenemos dos mundos bien separados, los elementos del DOM y los componentes. Son por supuesto, fundamentalmente distintos en su funcionamiento.

### Soportando funciones con `createElement`

Al crear un elemento del DOM se debe bajar a la API de DOM que nos provee el browser a través de su engine de JS, mientras que los componentes no representan más que una llamada a función.

Podemos, sin embargo, mejorar ligeramente la experiencia de uso, para que `createElement` funcione también para componentes, de forma tal que, en nuestra UI, siempre usamos `createElement` cuando queremos un elemento visual, ya sea un elemento primitivo del DOM, como un div o un input, o un componente como Message.

Para ello, vamos a tener que cambiar nuestra library, para dar soporte a pasar una función como `elemType`. Si se recibe una función, lo que se hace es invocarla, como habíamos hecho con nuestra primer implementación. Esta vez, sin embargo, vamos a pasar los "atributos" a la función, permitiendo entonces pasar argumentos a un componente, de la misma forma que pasamos atributos a elemento del DOM, aunque el comporamiento interno es sustancialmente diferente entre uno y otro. Si nos dan hijos para un componente, lo agregaremos a las props.

Esto permite uniformizar la idea de props. Podemos hablar de props, independientemente de si estamos trabajando con componentes o con elementos del DOM.

Este es un cambio mínimo, que solo mueve ligeramente algunas cosas de lugar, pero que permitirá uniformizar la forma de nuestra interfaz.

### Unificando la forma de los props

Un detalle más... venimos pasando los atributos a nuestro createElement de elementos del DOM como un objeto, usando pares clave valor, donde las claves son strings. Pero para JS, escribir el objeto como `{ 'clave': 'valor' }` o `{ clave: 'valor' }` es indistinto. Podemos entonces transformar todas nuestras llamadas con este último formato.

Hay sin embargo, un caso clave. Al pasar el atributo `class` con este formato, nos encontramos que no es posible, ya que class es una palabra reservada del lenguaje. Agregaremos un cambio mínimo en la library para que, al recibir un
atributo bajo el nombre de `className` asigne el atributo `class` en su lugar,
y cambiaremos en las llamadas class por className. Esto mismo es lo que hace React en su implementación.

### El rest operator

JS es un lenguaje muy versatil, pero a veces confuso. Existe un operador en particular, que se escribe con tres puntos consecutivos (`...`), que, dependiendo de donde se use, recibe nombres distintos, y tiene funcionalidad distinta.

Cuando esos tres puntos se usan en el último parámetro de la definición de una función, se conoce como **Rest Operator**.
```js
function f(a, b, ...rest) { }
```

El operador de resto sirve para indicar que la función espera un número indefinido de argumentos a posteriori de `a` y `b`. Es decir que podemos invocar a la función como `f(1, 2)`, `f(1, 2, 3)`, `f(1, 2, 3, 4)`, `f(1, 2, 3, 4, 5)`, etc.

Dentro de la función, el parámetro rest siempre será un array. El array puede estar vacío (si no se pasaron argumentos), o puede tener elementos. La cantidad de elementos del array se corresponderá a la cantidad de argumentos adicionales que se hayan pasado. Puede recorrerse el array para obtener todos los elementos.

Solo puede haber un operador de resto por función, y este debe ser el último parámetro que se define... algo que tiene mucho sentido.

Vamos a usar el **rest operator** para los children en la library de UI. De esta forma podemos pasar los hijos de un componente a `createElement` sin estar definiendo una lista con corchetes. Basta pasar entonces todos los componentes que queremos como hijos como últimos argumentos.

### El spread operator

Otra forma que toma el operador `...` es la de **spread operator**.

El spread operator permite tomar los elementos de un array y separarlos en elementos independientes.

El spread operator tiene muchos usos, por ejemplo sirve para copiar un array de forma superficial:
```js
const arrayCopiado = [1, 2, 3];
const copiaDeArray = [...arrayCopiado];
```

La idea es que con el spread operator el `arrayCopiado` se "separa" en sus componentes, algo como "1, 2, 3". Esos elementos, usados dentro de unos corchetes, hacen que se creee otro array con dichos elementos.

Donde también es útil el uso es cuando contamos con un array, y lo queremos pasar a una función que usa el operador de resto. Si pasaramos el array directamente, el receptor obtendría un array, que dentro tiene un array, en lugar de un array con todos los elementos. El operador de spread nos permite evitar ese problema.

Así, si cuento con un array con los hijos de un componente, podemos pasarelos a `createElement` de la siguiente forma:
```js
const children = [ /* ... */ ];
return createElement('div', { /* ... */ }, ...children);
```


## Etapa 07: Mejorando las props

En esta etapa vamos a ver como mejorar ligeramente las props, para hacer que sea más fácil trabajar con ellas.

### Usando asignación desestructurada con las props

Al igual que lo hicimos en la asignación de variables, podemos usar la asignación desestructurada. Cuando en lugar de nombre de un parámetro colocamos una estructura de objeto, JS intentará desestructurar el argumento recibido.

Esto permite recibir un único argumento, pero desestructurarlo inmediatamente en sus partes, pudiendo trabajar de allí en adelante cual si hubieramos recibido varios parámetros.

Es un truco muy simple, pero efectivo, y simplifica muchisimo el proceso de trabajo cuando de props se trata. Por supuesto, elegir usar o no esta tecnica pasa a ser cuestión de estilo, pero es una práctica común en el mundo de los frameworks web.

Este es el único cambio que haremos en esta sección, y solo aplica a los componentes en `ui.js`. Mirá los parámetros para ver como han cambiado.


## Etapa 08: Vinculando la lógica y la UI

En esta etapa vamos a querer vincular nuestra UI con la lógica que tenemos en la aplicación.

### Un dato para la prop

Hasta ahora fue fácil, todo lo que hicimos vive en el lado de la interfaz, y nos preocupamos únicamente por hacer que las cosas se vean bien. Sin embargo, en algún momento necesitamos que los datos vengan de la lógica de la aplicación, y no que sean datos fijos que ponemos en la UI.

Pero gracias a las props, ya tenemos todo lo que necesitamos para poder mostrar los datos. Solo nos queda un paso menor, pero fundamental, cambiar los mensajes fijos en App por la lista de mensajes que pertenece a la lógica de la aplicación.

Para hacerlo hay 3 pasos claves:

El primero es que, al momento, nuestra lógica no exportaba absolutamente nada. No lo necesitaba, pues nadie requería de sus datos. Pero ahora necesitamos poder acceder a los mensajes, y por tanto, vamos a seguir la misma lógica que hicimos para la library de UI, exportar en un solo objeto, todos los elementos de la lógica de aplicación que sean relevantes. Llamaremos al objeto **Model**, algo que discutiremos más tarde.

Como segundo paso, vamos a importar la lista de mensajes en la interfaz, de la misma forma que lo hicimos con `createElement` o `createRoot`, usando asignación desestructurada, tomando los mensajes del Model.

El último paso es cambiar en el componente `App` la lista de mensajes, eliminando la lista que estabamos utilizando, y usando en su lugar la variable que importamos.

Listo, ya estaos mostrando los mensajes que hay en nuestra lógica. Por supuesto, como aún no hemos conectado los procesos de envío y recepción de mensajes, no habrá nada a mostrar. Por lo tanto, vamos a hacer que la lista de mensajes comience con algunos elementos, en lugar de comenzar vacía, que es lo que sucedería en un chat real.

Con esto ya estamos listos para ver como se ha vinculado el contenido de nuestra lógica con la interfaz que creamos.


## Etapa 09: El patrón MVC

En esta etapa vamos a aprender sobre el patrón MVC, al mismo tiempo que agregamos nuestros primeros códigos de control de eventos.

### Vinculando acciones a la UI

Ya logramos que nuestra interfaz muestre los datos de la lógica del programa, pero aún no tenemos un envío de mensajes. Para lograrlo, deberemos "colgarnos" de los eventos del DOM, como "onclick", "onchange", "onkeyup", etc. Estos se presentan en dos formas:
* Puede configurarse un atributo en el HTML cuyo valor refiere a código JS.
* Puede hacerse directamente en JS mediante la función `addEventListener`.

La primera, si bien se mantiene por retro-compatibilidad, no suele ser la opción recomendada, ya que implica varias problemáticas referidas a la globalidad del código a utilizar. Por ej. si queremos llamar a un función que vive localmente dentro de un módulo, o dentro de otra función, es imposible hacerlo de esa forma.

Entonces el camino a seguir es el segundo método. Pero para poder hacerlo fácilmente, vamos a requerir modificar ligeramente nuestra library. Ahora, además de soportar className, tenemos que agregar un caso especial: todo atributo comenzado con 'on' seguido del nombre de un evento deberá procesarse de forma especial. Así, procesaremos atributos como `onClick` u `onChange`.

En estos casos, lo que debemos dar de valor no es un string, sino una función a invocar. Dicha función puede recibir un argumento que representa el evento que ocurrió, lo cual incluye información sobre el elemento sobre el cual ocurrió el evento y otros datos. Este evento es generado y dado como argumento automáticamente por el navegador.

Lo que haremos entonces es que la library, para estos atributos, haga un `addEventListener`, donde el callback será la función dada como valor en ese atributo.

Vamos a agregar comportamiento en la interfaz, tanto cuando se modifica el texto en `SendMessageBox` como cuando se presiona el botón "Enviar".

### Model, View and Controller

En este proceso de desarrollo estamos implementando un patrón de diseño conocido
como "Model-View-Controller" (MVC). Este patrón de diseño es el preferido para implementar interfaces gráficas que se vinculan con lógica de aplicación, de forma tal de que la lógica y la interfaz queden completamente separadas. Al desacoplar la interfaz de la lógica y viceversa, surgen interesantes posibilidades. Por ejemplo, la misma lógica podría ser utilizada por diferentes interfaces (una web, una app mobile, una app desktop, etc.) sin necesidad de cambios. Además el código termina siendo más escalable y simple.

En este patrón de diseño hay tres entidades bien delimitadas:
* **Model**: El modelo es la lógica real de la aplicación, los datos que importan y las funciones que tienen relevancia para manipular dichos datos. En nuestro código, es lo que está contenido en `logic.js`.
* **View**: La vista es la capa de presentación. Se compone de los botones, elementos de texto, etc. que componen la parte que el usuario ve de la aplicación. También todo el código que es relevante para definir la misma, por ej. el HTML, el CSS, y en nuestro caso, tanto el código de nuestra library de UI, como la mayor parte de lo que hay en la interfáz definida en `ui.js`.
* **Controller**: El controlador es la capa intermedia que se encarga de vincular la vista con el modelo. Se compone muchas veces de código bastante genérico, pero que "pega" los dos mundos, (glue-code). Sin embargo, en ocasiones el controlador es mucho más complejo, y debe realizar tareas adicionales de coordinar lo que el usuario hizo en la vista con varias partes del modelo. Este es el más interesante.

En muchas implementaciones de MVC el controlador puede vivir en un archivo diferenciado. Este es el caso de frameworks como ASP.MVC, Swing, etc. Pero a veces, esa diferenciación no está dada en archivos, y es más bien conceptual.

Esto es un poco lo que sucede en React y en nuestra library. El controlador está compuesto de estas funciones que declaramos en `ui.js` y que nos permiten reaccionar ante las acciones el usuario, modificando el modelo de forma acorde, así como leer el modelo para presentarlo en pantalla. Por ej. la función `handleTextChanged` o `handleButtonClicked` son parte del controller.

Cuidado, es importante no confundirse. No es que cualquier función que tenemos en un componente es controlador, muchas son parte efectivamente de la vista, ya que solo hacen cosas que tienen que ver con la presentación. Funciones como `getTime` por ejemplo, no son controladores. Por otro lado, los componentes que manejan props, y no se comunican con el modelo, no son controladores, incluso si el dato que manejan salió en última instancia del modelo.

Una buena implementación de un controlador en este tipo de frameworks web tiene otros varios elementos que en general provee la library, y hace uso a su vez de otros patrones de diseño. Pero primero necesitamos entender las problemáticas asociadas a la correcta implementación de este modelo para comprender los elementos que se necesitan.

### El problema con el proceso de rendering

Con nuestros eventos ya vinculados, podemos abrir el inspector de nuestro navegador y verificar que en la consola aparecen los logs apropiados. Todo funciona de forma adecuada pero...¡la interfáz no se actualiza!

¿De quién es la responabilidad de actualizarlo? Si pusieramos la lógica de actualizar el contenido en el modelo tendríamos un problema conceptual grave: El modelo intentaría hablar directamente con la vista, sin pasar por el controlador. No es la idea. En el patrón MVC, el controlador siempre se para en el medio y actúa de intermediario, evitando la comunicación direca entre vista y modelo. Si hay que actualizar la interfaz, la interfaz debe hacerlo, y corresponde que el conrolador sea quien le avise.

Por ahora, vamos a hacer que sea la interfaz la que se actualice, ya que sabemos exactamente cuándo ha cambiado el modelo (justo despues de enviar un mensaje). Pero encararemos esto en la próxima etapa.


## Etapa 10: Lanzando el re-rendering

En esta etapa vamos a solucionar el problema de actualizar la vista cuando cambiamos el modelo.

### Hey, ¿Donde está mi código?

Si miramos el código, vamos a ver que ya no están los archivos de `logica.js` y `ui.js`. Hicimos un simple renombre para recordar mejor el rol que cumple cada uno. Ahora la lógica está en `model.js` y la interfaz en `view.js`.

Este es un cambio menor, pero que nos permitirá recordar mejor la idea de MVC.

### El re-rendering

Al momento de iniciar la aplicación, tuvimos que usar `createRoot` para crear un objeto sobre el cual podemos hacer `render`. Ese proceso de rendering es el que efectivamente hacer que la aplicación se muestre en pantalla por primera vez.

Al momento de requerir modificar los contenidos, los frameworks web toman varias opciones. Una de las opciones es intentar conciliar la vista con el modelo, actualizando la vista y agregando o quitando elementos según sea necesario. Este modelo funciona, pero cuando las vistas y los datos se vuelven muy complejos, es muy dificil de implementar de forma adecuada y eficiente.

El gran problema con este modelo es que muchas veces el cambio al modelo ocurre en el componente A, pero queremos actualizar el componente B, que no se relacionan entre si. La idea de tener componentes independientes, es precisamente poder desacoplar A y B, pero seguir un modelo como el mencionado nos generará un alto acoplamiento entre ellos. A medida que crece la cantidad de componentes y el modelo se vuelve más complejo, se empieza a generar código spaghetti, en donde todos conocen a todos, y se vuelve sumamente dificil seguir el flujo de los datos y de las actualizaciones, generando muchisimos problemas a la hora de actualizar la interfaz sin romper funcionalidades existentes.

Otra técnica es directamente tirar a la basura la vista actual y crear una nueva. Algo parecido a volver a iniciar la interfaz, pero usando esta vez los nuevos datos del modelo.

Este último proceso, conocido como _re-rendering_, tiene, en su versión más simple, una implementación trivial. De hecho, nosotros ya tenemos implementada essta última opción gracias a la función `render` que la diseñamos para que pueda o no recibir un argumento, y si no lo hace, utiliza el último que fuera usado. Es decir, que la primera vez que llamamaos a render, debemos si o si pasar un argumento, pero podemos volver a llamar a render todas las veces que queramos, sin argumento, y siempre dibujará el mismo componente, pero por supuesto, con los datos actualizados.

Esta última opcion es mucho más simple de manejar, pero si la interfaz se vuelve compleja y grande, tirar todo a la basura y volver a recrearlo es costoso. Los frameworks avanzados como React utilizan una API que provee JS conocida como ShadowDOM. El ShadowDOM podemos pensarlo como una copia del DOM, pero que vive en la memoria y no impacta en la página visualmente. Al estar completamente en memoria, y no requerir renderizado, su manipulación se logra con mejor eficiencia. Luego, los componentes de React se generan en el ShadowDOM, tirando y generando todo completamente, para finalmente realizar un proceso de reconciliación entre el ShadowDOM y el DOM real, modificando solo aquellos elementos que se modificaron. Además se pueden usar técnicas que permitan no tirar la totalidad de la vista, sino solo los componentes que dependen de ciertos datos del modelo.

Nosotros no estámos creando una library tan buena como React, por lo que no vamos a trabajar con ShadowDOM, ni preocuparnos mucho por la eficiencia. Cuando haya un cambio, tiraremos la totalidad de la vista y la recrearemos. Vamos a lograr esto llamando a la función `render` sin argumentos. Aquí es donde vamos a necesitar importar la `rootApp` que nos da la library de interfaz que creamos. Lo haremos mediante la función `getRootApp` que se exporta y que nos permitirá accederla para su uso, llamando a render.

> Como mención aparte, este problema de re-renderizar, es algo que React hace
> muy bien, y de forma muy eficiente, pero nosotros implementamos de forma pobre
> (aunque funcional). Este es el motivo por el que en React, uno escribiría:
>
> ```js
> createRoot(document.getElementById('root')).render(
>     createElement(App)
> );
> ```
> Y no:
> ```js
> createRoot(document.getElementById('root')).render(
>     App
> );
> ```
> Como hacemos nosotros. Un cambio menor a la vista, pero que tiene que ver con
> la forma de procesar el renderizado. Nuestra implementación requiere que lo
> que se pase sea una función y no un elemento del DOM.

Al fin, nuestra interfaz se actualiza ante el envío de mensajes. Solo nos queda realizar algunos cambios para tener la app completamente funcionando, ¿Verdad?
