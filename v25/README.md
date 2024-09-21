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


## Etapa 11: El problema del one-way binding

En esta etapa vamos a activar la recepción de mensajes y ver el problema que esto conlleva.

### Activando la recepción de mensajes

En esta etapa vamos a hacer un cambio menor al modelo. Como ultimo paso en la definición de nuestro modelo, justo antes de exportar, vamos a activar el proceso de recepción de mensajes que simulamos.

Esto va hacer que cada 5 a 15 segundos, se reciba un nuevo mensaje. Te invitamos a abrir la aplicación y probar, esperando un tiempo, y mandando un mensaje para ver que sucede.

### El problema del one-way binding

Si probaste la aplicación, vas a encontrarte un pequeño problema. Los contenidos se actualizan en la vista, pero solo cuando enviamos nosotros un mensaje. En ese momento llegan todos los mensajes que fueron enviados por Bob, juntos. Esto presenta un gran problema: debemos escribir para saber si nos escribieron. No parece una forma de chat muy útil.

Esto se genera porque nuestra aplicación tiene lo que se llama _"One-Way Data Binding"_. Es decir, el flujo de los datos va, desde la vista, al controlador, y de ahí al modelo. Pero si el modelo cambia de alguna forma, sin pasar por el controlador, el controlador no se entera, y por tanto, la vista no se actualiza. Recordemos que actualizar la vista implica lanzar un proceso de _re-rendering_ y que este proceso queremos que lo active el controlador.

Este problema no es de solución trivial. Se nos pueden ocurrir muchas opciones, como oner un timer y actualizar cada cierto tiempo. Pero no es útil ya que hace que la aplicación esté constantemente recargando la vista, generando un gran costo computacional, muchas veces innecesario. La solución debe incluir algún mecanismo en donde el modelo notifique que "cambió", permitiendo al controlador enterarse. Veamos como sigue...


## Etapa 12: Agregando two-way binding

En esta etapa vamos a solucionar el problema del _one-way binding_ para lograr "recibir mensajes" de forma apropiada.

### El two-way binding

Lo que queremos para solucionar el problema es que los datos fluyan hacia ambos lados, es decir, de la vista hacia el modelo, pero también del modelo a la vista, siempre via el controlador. Es decir, queremos un flujo bidireccional, lo que se conoce como _"Two-Way Data Binding"_.

El flujo bidireccional se logra mediante un muy conocido patrón de diseño, el observer. En el patrón observer, un elemento mantiene registro de los observadores. Cuando el objeto recibe la señal apropiada sobre la ocurrencia de un evento, notifica a todos los observadores que estaban a la espera del evento.

Hay muchas implementaciones de observer para diversos lenguajes. Nosotros vamos a proveer una implementación muy simple, en forma del archivo `observer_library.js`. En nuestra implementación vamos a asumir que los observadores son funciones. Entonces, cuando el evento ocurre, simplemente llamamos a dichos observadores. Se pueden lograr implementaciones más inteligentes, o extensibles, pero esta implementación será suficiente para entender la lógica fundamental del problema. Adicionalmente agregamos un mensaje `clear` al observer que servirá para eliminar todos los observadores.

> Detalle a tener en cuenta. El orden en el que cargamos los módulos en el HTML
> es relevante. Vamos a necesitar que el observer esté primero.

La idea entonces es usar la library e importarla en el modelo. Vamos a crear un observador para el concepto de evento que indica que "la lista de mensajes fue actualizada". Esto puede ocurrir en dos escenarios, o bien se envió un mensaje, o bien se recibió un mensaje. En ambos casos, notificamos al observer que el evento debe ser activado.

Este observer lo vamos a exportar. Podemos exportarlo de muchas formas: exportando directamente el objeto, mediante una función que actúa de getter, etc. Vamos a elegir una muy interesante que muestra el poder del dinamismo de JS.

En JS, los arrays son objetos, y como objetos, son también dinámicos. Pueden, además de incluir elementos de forma posicional, incluir otros atributos, que pueden contener valores o funciones. Como no es necesario exportar la totalidad del observer, ya que lo que nos importa es que el controlador pueda simpleente registrarse para observar el evento, pero no lanzarlo, vamos entonces a agregar la función addObserver del observador al array de la lista de mensajes, como un atributo nuevo. Luego, no nos hace falta exportar nada nuevo.

Una library más pulida podría usar multiples observers, y actualizar solo las partes relevantes de la vista. Nosotros, como ya mencionamos, vamos a actualizar la totalidad de la vista mediante la llamada a render.

Notar que no incluimos a `writtenMessage` en los elementos a observar, ya que por el flujo de la aplicación, este solo cambia desde la interfaz, o, cuando cambia en el modelo, lo hace junto a un cambio de messages que fuerzan la recarga de la vista, dejando el texto vacío.

Claro que esto es un beneficio cuando mandamos un mensaje, pero un gran problema al momento de recibirlos. Si recibimos un mensaje mientras estabamos escribiendo algo, la vista entera se recarga, y lo que teníamos escrito en la interfaz se pierde. Además, nuestra vista y nuestro modelo quedan inconsistentes, lo cual, es algo muy malo.

Para solucionarlo, basta agregar un valor más a las props del input, `value`, que debe comenzar como el texto que esté escrito en el modelo. Esto hace que si hay una recarga, el valor por defecto, es lo que había en el modelo, y por tanto no perdemos información. Te invitamos a comentar esa línea de forma temporal para ver la problemática en acción.

Pareciera que lo tenemos, y en efecto, la funcionalidad principal ya está andando. Pero, si observamos bien, aún hay varios problemas de usabilidad menores, que vamos a querer solucionar.


## Etapa 13: Hooks

Nuestra aplicación está casi lista, pero hay algunos detalles a pulir.

### El ciclo de vida de los componentes

Uno de los problemas que nos vamos a encontrar es que, las cosas que queremos hacer, como, mantener el foco sobre un componente, o realizar un scroll, no pueden ser realizadas de ninguna forma desde nuestros componentes.

Esto tiene que ver con el **Ciclo de vida** de un componente. Al momento en que se invoca a la función del componente, el componente aún no existe en el HTML. Solo existe en el HTML cuando el componente ya ha sido "montado", es decir, cuando se realizó el proceso de render, y efectivamente el HTML fue actualizado.

Esto hace que no podamos colocar código que implica manipular el HTML en nuestros componentes. Por ej. si intentamos hacer `document.getElementById` para obtener un elemento que definimos dentro del componente, obtendremos undefined, pues no hay aún un componente con dicho id en el HTML.

Necesitamos un mecanismo para "colgarnos" del ciclo de vida de los componentes, pudiendo por ejemplo, reaccionar al proceso de que el componente ya fue montado, y activar cierta porción de código cuando esto ocurre.

Este tipo de funciones que suelen permitirnos "colgarnos" de un ciclo de vida se conocen como **Hooks** (ganchos, en español, porque te permiten colgarte de ellos). El concepto de Hook es sumamente usado en React y en otros frameworks web. De hecho, React soportaba clases como componentes, y una forma de "hookear" era simplemente sobreescribiendo algún método. Pero este modelo tenía problemáticas, y decidieron deprecarlo desde hace ya varias versiones, debiendo usar hoy solo componentes funcionales. Dentro de uno de estos componentes, las funciones llamadas `useX`, donde X es alguna palabra en particular, suelen ser hooks.

### Implementando un Hook para el render

Para permitir a la vista colgarse del ciclo de vida, nuestra library de UI va a tener que proveer algún mecanismo adicional.

Una de las cosas que necesitamos para pulir todo es poder colgarnos de ciertos eventos que ocurren en la UI. Por ejemplo, vamos a querer hacer algo una vez se haya renderizado la aplicación. Esto no lo podemos hacer en nuestro componente así como así, porque, en el momento que definimos el componente, aún no se ha renderizado.

Debemos entonces contar con un observer también para eventos de la UI, y colgarnos de estos. Vamos a implementar en nuestra library un observer que maneja el evento que indica que "los elementos se han re-renderizado". Luego, vamos a exportar una función bajo el nombre de `useEffect`, que nos va a permitir registrar una función en dicho observer, y vamos a lanzar el evento cuando se termina de ejecutar la función `render`.

> Notar que, por como funciona el proceso de renderizado, los componentes
> "viejos", son descartados al re-renderizar. Por tanto, dichos componentes
> ya no están en la interfaz, pero existen aún así en la memoria si se los
> sigue referenciando, por ejemplo, desde el observer. Entonces, como vamos a
> tirar todos los componentes que habían registrado un observador, necesitamos
> limpiar la lista de observadores, antes de recrear toda la interfaz.

El nombre `useEffect` lo elegimos para coincidir con React y su idea de Hooks, en donde se bisca que haya un "efecto visible" ante cambios externos. El useEffect de react es, un poco más complejo que el que estamos implementando, pero a los efectos de nuestro caso de uso, se comportan de forma muy parecida.

### Usando el hook

Ahora que nuestra library nos da la posibilidad de "colgarnos" del momento de post-rendering, vamos a modificar la vista para utilizar esos hooks.

Queremos dos acciones distintas, en dos componentes diferentes:
* En la lista de mensajes, vamos a querer hacer un scroll al final de la lista, para que siempre se muestren los mensajes más nuevos, que aparecen más abajo.
* En la caja de envío de mensajes vamos a querer marcar al cuadro de texto como el elemento con el foco, para poder continuar escribiendo, incluso si se re-renderiza la vista por llegada de nuevos mensajes.

Entonces importaremos useEffect de la UILibrary, y agregaremos una llamada en cada uno de los componentes mencionados. En cada caso, pasaremos una función para modificar la vista de forma acorde.

Notar que en ambos casos, vamos a tener que poder referenciar a uno de los elementos del DOM, por lo que necesitamos agregar ids a algunos elemento, algo que hasta ahora no era necesario.

Con eso, ya tenemos solucionado el problema del scroll y del foco. Cada vez estamos más cerca de la versión final de la aplicación...


## Etapa 14: Eliminando la necesidad de ids

En esta etapa vamos a agregar un nuevo hook, que nos va a permitir utilizar un elemento del DOM en nuestro `useEffect`, pero sin necesidad de estar poniendo ids en nuestros elementos.

### El problema con los IDs

Si bien la solución que hicimos funciona bien, podemos observar que el ID elegido en el caso de la lista de contendios, `container`, es un nombre bastante genérico. HTML espera que los IDs que utilizamos sean únicos en todo el DOM. Si intentamos hacer `document.getElementById` pasando un id que está repetido, cosas muy malas pueden suceder.

Parece algo simple de solucionar: basta asegurarse de que el ID no se repite y listo. Pero imaginemos una vista con centenares de componentes, realizada por decenas de programadores que trabajan en conjunto. Encontrar nombres únicos en esos casos se vuelve más dificil, y los problemas estarán a la orden del día.

### La solución: otro hook

Para solucionar el problema anterior, otro hook, la library de interfaz nos puede proveer un segundo Hook. Este Hook funcionará de forma ligeramente distinta, y no va a necesitar un observer.

Lo que necesitamos es algún mecanismo mediante el cual podamos pedirle a library la referencia a un elemento particular del DOM que conocemos (dentro del componente que estamos definiendo). De ahí el nombre de `useRef` para nuestro segundo hook (El mismo que, desde ya, emplea React).

Este hook consiste en una función que devuelve un objeto. Ese objeto tiene un atributo `current` que por defecto será undefined. Luego, al momento de declarar componentes, podremos pasar una prop especial, bajo el nombre de `ref`, con ese objeto. Cuando `createElement` encuentre ese atributo, en lugar de asignarlo o pasarlo como prop al siguiente componente, simplemente asignará el valor de current del objeto dado con el elemento que está creando.

De esa forma, cuando se llama a useEffect, tras el render, el objeto devuelto por `useRef` tendrá como valor el componente, evitandonos la necesidad de tener que ir a buscar el elemento con un id.

> Nota: En React useRef es bastante más complejo, y si bien nace con este caso
> de uso, puede ser utilizado también para otros, como manejar intervalos o
> timeouts.

Podemos ver el código de la library y de la vista para entender como ha cambiado. Un paso menos en nuestra app, pero aún faltan detalles...


## Etapa 15: La problemática del estado local

En esta etapa vamos a ver la necesidad de contar con estado local, y las problemáticas de usar una variable para mantener dicho estado.

### El problema del foco

Tal vez no lo hayan notado al momento, pero hay un pequeñisimo problema en la aplicación aún. Si escribimos un texto, pero no lo enviamos, y justo llega un mensaje, la vista se vuelve a renderizar. Pudimos solucionar el tema de re-enfocar el cuadro de texto, e incluso pusimos código para que el cursor quede al final del texto. Esto nos permite continuar escribiendo como si nada... bueno, casi.

Si el ya tenemos texto escrito, y movemos el cursor hacia atrás, para agregar una palabra en el medio del texto o algo similar, y justo llega el mensaje, la selección pasará al final del texto, por lo que si seguimos tipeando, estaremos escribiendo en una ubicación distinta a la que estabamos antes. Lo mismo ocurre cuando tenemos seleccionado una parte del texto, la selección se pierde.

Lo ideal sería que el cursor quede en la misma posición que estaba antes de re-renderizar, y mantener la selección existente de haber una.


### Variables para mantener el estado local

La idea obvia crear una variable local en la función, para mantener allí la posición actual del cursor (Para mantener la selección se necesitan dos variables, una para el inicio de la selección y una para el final. En el caso del cursor, cuando no hay selección, ambas son iguales). Si el cursor cambia, cambiamos el valor de las variables, y al momento de renderizar, marcamos la selección en base a las variables.

Esto es lo que agregamos a nuestro componente de envío de mensajes, dos variables que mantienen el estado de la selección. Adicionalmente agregamos un nuevo evento al elemento del DOM y su correspondiente función para manejarlo.

Sin embargo, esta implementación no funciona. ¿Por qué? Bueno, es muy simple. La función se ejecuta cada vez que se re-renderiza la aplicación. Esto hace que las variables pierdan su valor existente, y se vuelvan a definir de cero.

Las variables entonces no pueden ser definidas dentro del componente, deben definirse fuera, de forma tal de que el valor persista a lo largo del tiempo independientemente del ciclo de vida del componente. Intenta mover las variables fuera del componente para ver cómo el código pasa a funcionar.

Veremos como solucionar este problema "a la React" en la próxima etapa.


## Etapa 16: Un hook para el estado

En esta etapa vamos a ver como solucionar el problema de definir estado local "a la React", es decir, sin tener que definir las variables fuera del componente.

### El hook useState

La library de UI ahora tiene un nuevo hook, `useState`. Este hook está pensado para definir estado que se mantiene en el componente entre un renderizado y otro.

La técnica para su implementación es simple, definimos un objeto en donde guardaremos todos los valores que deban ser mantenidos a lo largo de diversos renderizados. Este objeto, llamado `states`, está organizado como un conjunto de pares clave valor, donde se registra a qué llamada de useState pertenece cada valor.

> La implementación usada tiene varios "hacks" que nos permiten identificar el
> componente en donde se llamó a `useState`, y cuantas veces se ha llamado en
> dicho componente, como forma de identificar univocamente el valor a lo largo>
> de diversos renderizados. El componente y la cantidad de llamadas previas en
> el mismo no varía entre un renderizado y otro.
>
> Así, la primera vez que se llama a `useState` se crea un nuevo estado en el
> objeto, pero las veces subsiguientes se devuelve el estado ya existente.
>
> Luego, un detalle de implementación es que en la función `render`, previo a
> montar los componentes, se debe reiniciar el conteo de llamas.
>
> La implementación concreta no es del todo relevante, fuera del hecho de que
> los valores se guardan en un objeto espcial `states` y que se leen o
> modifican desde el mismo. Sin embargo instamos a mirarla para entender mejor
> la idea y el funcionamiento.


Luego, la función `useState` devuelve una lista con dos elementos, donde el primero se corresponde al valor de dicho estado, y el segundo es una función que permite asignar un nuevo valor al estado. Además, toma un valor inicial, para asignar durante la primera vez que se llama a este hook.

Al utilizarlo se hace algo como:
```js
let [ myState, setMyState ] = useState(0);
```

Observar el uso de la asignación desestructurada para acceder tanto al valor como al setter.

Alguno podría preguntarse el por qué del setter. Pensemos en el siguiente código:
```js
let [ myState, setMyState ] = useState(0);
...
myState = 10;
```

Durante la asignación del valor 10 a `myState`, lo que estamos asignando es la variable local, no el valor que el objeto `states` tiene asociado. Entonces, ese tipo de asignaciones hará que durante el próximo renderizado, el valor se pierda. Sí o sí debe pasar la asignación por el setter, ya que es este el que se encarga de modificar el objeto `states` de forma apropiada.

Si bien a primera vista puede parecer muchisimo más complejo que definir la variable afuera del componente, hay muchos beneficios asociados a utilizar este modelo, además de tener un estado que funciona a través de varios renderizados. React en particular mantiene registro del estado y lo observa (también lo hace con las props), y vuelve a renderizar un componente cuando su estado cambia de cualquier manera (también lo hace con las props). Si se usaran variables simples, react no podría registrar que los valores han cambiado.

Ya estamos muy cerca de cerrar la aplicación, no te desanimes ahora y veamos como sigue...


## Etapa 17: Callbacks

En esta etapa vamos a intentar que la información fluya no solo de los componentes padres a los hijos, sino también a la inversa.

### El problema del flujo de la información

Mediante las props hemos logrado pasar información de los componentes padres a los hijos, pero no tenemos forma de que los hijos le envíen información al padre. De hecho, por ser funciones, las funciones que fueron llamadas no tienen idea de quién las llamó, y por tanto no conocen a el componente padre. Agregar algún tipo de conocimiento mutuo rompería la idea de tener este tipo de conocimiento lineal, que hace que la vista sea fácil de comprender, reutilizar y escalar.

### Callbacks

Existe una forma, sin embargo, de pasar información a un padre, sin conocerlo, y que hace uso de elementos que ya tenemos disponibles, y por tanto no hay que modificar nada de nuestra library. Este mecanismo son los **Callbacks**.

Un callback no es más que una función dada como argumento. Dicha función será invocada por la función que esperaba la misma de parámetro, en este caso, nuestro componente hijo. Como la función pasada puede contenter parámetros, el componente hijo puede pasar como argumento la información que desea que el padre reciba. Veamos un ejemplo:

```js
const ComponenteB = ({ callback }) => {
    ...
    callback(informacionAPasarAlPadre);
}

const ComponenteA = () => {
    const funcionParaManejarLoQueMeComunicaElHijo = (datosQuePasaElHijo) => {
        ...
    };

    createElement(ComponenteB, {
        callback: funcionParaManejarLoQueMeComunicaElHijo
    })
}
```

Este mecanismo solo utiliza la idea de props que ya hemos visto, pasando funciones, como también hicimos con los eventos. La única diferencia es que esta vez las funciones pasadas van a otro componente, y este deberá invocarlas en el momento apropiado, con la información relevante dada.

### Moviendo el uso del modelo hacia App

Gracias al modelo de callbacks vamos a poder mandar la interacción con el modelo completamente a App. Esto nos permite unificar código duplicado, y centralizar el uso del modelo en único punto.

Para hacerlo solo debemos agregar un callback a nuestro componente `SendMessageBox`. Sin embargo, vamos a necesitar hacer uso de un estado más, que contenga el texto actual escrito en el input, ya que ahora no lo escribiremos al modelo hasta el momento del envío del mensaje. Tampoco debemos olvidar cambiar el valor de "value" en el imput por el nuevo state que estamos utilizando.

### Primer cierre

Ahora si, podemos dar por cerrada nuestra aplicación. Tenemos por fin una aplicación que cumple la totalidad de las expectativas de un usuario.

Sin embargo, no vamos a cerrar acá. Nuestra library de UI está bien, pero fue hecha en una tarde, por un único programador, conteniendo muchos parches, y no estando testeada. Claramente no puede compararse con una library industrial como Angular, Vue o, por supuesto, React.

Sin embargo, hemos intencionalmente utilizado nombres y estructuras que nos van a permitir mover nuestra vista a React con poco esfuerzo. Esto es lo próximo que vamos a encarar.


## Etapa 18: Usando React

En esta etapa vamos a tirar nuestra pobre library de UI y reemplazarla por React.

### React y ReactDOM

El primer paso para incorporar React a nuestro código será modificar el HTML.
Debemos ahora importar la library de react (y también react-dom) en nuestro HTML.
Vamos a agregar estas libraries en el head. Por otro lado, eliminaremos nuestra UI library.

En lo que se conoce como su versión UMD (Universal Module Distribution), React incorpora a window un objeto con el nombre `React` (Y react-dom hace lo propio).

Dentro del objeto React vamos a encontrar varias funciones conocidas, como `createElement`, y nuestros amigos los Hooks, como `useState`, `useEffect`, etc.

Entonces para usar esas funciones solo debemos cambiar en único lugar, nuestro import. En lugar de tomar la cosas de UILibrary, las tomaremos del objeto React.
El uso de las funciones, permanecerá prácticamente intacto.

Uno de los pequeños cambios es que la función `createRoot` no la provee react, sino que la provee otra library llamada `ReactDOM`. Si uno está haciendo una library con React, pero no una aplicación, en general no va a necesitar `createRoot`, por eso la gente de react elige distribuirlo de forma separada. Simplemente deberemos cambiar el lugar de donde importamos dicha función.

### Cambios en el funcionamiento

React es mucho más inteligente que nuestra library, y solo va a renderizar los componentes que correspondan. Para identificar esto React mira varios elementos, a los que llama **elementos reactivos**.

Un elemento reactivo puede cambiar de valor, y al hacerlo, se activa un re-renderizado del componente. Este tipo de elementos incluye a las props y a los estados.

Recordemos algo que ya mencionamos. React trabaja con ShadowDOM, y luego reconcilia este con el DOM real. Si no hubo cambios, entonces no se actualiza el DOM. Esto trae la ventaja de que solo aquellos componentes que efectivamente tuvieron un cambio van a ser re-renderizados.

En nuestro caso, esto trae el beneficio de que algunos eventos que debíamos manejar, como es el caso de la selección de texto en el input. Ya no lo necesitaremos, pues el elemento no va a ser re-renderizado, incluso si cambia la lista de mensajes.

Otro cambio no menor tiene que ver con cómo operan algunos elementos en React, como los inputs. React tiene el concepto de **elementos manejados** y de **elementos no manejados**. En un elemento manejado, el contenido del elemento está vinculado a un elemento JS, como un estado. React será el encargado de conciliar el contenido del estado con el componente, mediante two-way binding.

Para definir un input como manejado, debemos de asignar el estado en el campo `value`, pero también debemos de usar el setter del estado en la prop `onChange`.

Esto implica realizar unos mínimos cambios en el componente de envío de mensajes, ya que ahora no será el evento onKeyUp el que active la modificación del contenido, sino onChange. Seguiremos teniendo onKeyUp, pues debemos de reaccionar al momento en que se presiona la tecla enter.

Por último, es importante notar que la función `render` ahora toma un componente usando createElement y lo función del componente principal. Este es un cambio no menor, que tiene que ver con la forma en la que React maneja los procesos de re-renderizado.

### Renderizar la aplicación ante cambios en el modelo

En nuestra library teníamos una forma de exponer la app para poder realizar el re-renderizado cuando cambiaba la lista de mensajes. Ahora ya no es posible hacer eso.

El renderizado en react se va a lograr solamente modificando un elemento reactivo. Por eso, vamos a hacer trampa. Si miramos App, nos vamos a encontrar que ahora utiliza `useEffect`, para asociar el observador a los mensajes cuando se inicia el componente. Notar que `useEffect` devuelve una función, que se llamará cuando el componente se "desmonte". Esto es una de las ventajas de `useEffect` en react contra la que teníamos antes.

En este caso, vamos a llamar a una función que fuerza la recarga del componente. Y además, como React puede desmontar nuestro componente en cualquier momento, vamos a limpiar los observadores en caso de que se desmonte. Para lo cual agregamos un cambio menor al modelo.

La gracia es que vamos a asociar como observador una función que proviene del hook `useReducer`. Use reducer es un hook que es utilizado internamente por `useState`, y que no es relevante en este momento. Lo interesante es entender que el setter actúa de forma reactiva, por lo que, al llamar al setter, el componente fuerza su recarga.

Con esto, nuestra app react ya está funcionando... pero forzar la recarga de componentes no es algo feliz.


## Etapa 19: Usando contextos

En esta etapa vamos a usar un elemento que provee react, que permite definir un contexto. Esto va a permitir eliminar ese elemento que fuerza la recarga de nuestra interfaz.

### El hook useContext

Los contextos en react son un mecanismo que nos permite definir elementos que pueden ser utilizados de forma "global". Este mecanismo permite evitar pasar valores por props entre componentes muy lejanos entre sí en el árbol de componentes. Los valores de un contexto pueden ser accedidos en cualquier componente, desde donde se usa un proveedor de contexto hacia abajo.

Una ventaja de los contextos es que, si usamos de cierta forma su proveedor, dandole datos reactivos, vamos a lograr que ocurra un re-renderizado de la aplicación cuando los elementos reactivos cambien. Esto, en conjunto con otros hooks que ya conocemos, como useState para almacenar valores locales a un componente, o useEffect para "colgarnos" del ciclo de vida, nos van a permitir eliminar la idea de forzar un re-renderizado.

Básicamente crear un contexto consiste en 3 pasos:
* Definir el contexto (Creandolo mediante la función `createContext`). Este contexto puede recibir un valor por defecto, que solo se usa en caso de que no haya un proveedor correctamente inicializado. No vamos a usar ningun valor por defecto en nuesto caso, por lo que pasamos null.
```js
const ModelContext = createContext({
    ctxMessages: messages,
    ctxSendMessage: () => {}
});
```
* Usar el componente `Provider` del contexto que creamos en un componente que englobe a todos los elementos que queremos puedan usar el contexto. Este componente toma como prop un objeto que tiene un único campo `value`, que debe ser el objeto que se espera que los componentes que van a acceder el componente accedan. Por ejemplo, si queremos que `App` pueda hacer uso del contexto, haremos:
```js
createElement(ModelContext.Provider, { value: valoresDelContexto },
    createElement(App, null)
)
```
* Acceder al contexto, mediante el hook `useContext`. Esto lo podemos hacer en cualquier componente que esté dentro del provider, independientemente de que tantos niveles de distancia haya entre el provider y este. Es decir, lo podemos usar en App, en cualquier hijo de App, en cualquier hijo de los hijos de App, etc. La función `useContext` espera un contexto y devuelve los valores pasados al provider en `value`.
```js
const App = () => {
    const valorTomadoDelContexto = useContext(ModelContext);
    // ...
}
```

Si el elemento pasado a `value` del provider es un valor reactivo, entonces cada vez que este cambie, se re-renderizarán todos los componentes debajo del provider. Caso contrario, si es un valor no-reactivo, no habrá renderizado.

### Usando un componente que actúa de proveedor propio

Podríamos sentirnos tentados a pasar un objeto con los mensajes del modelo a `ModelContext.Provider` como value, pero esto no lanzaría ningún tipo de re-renderizado, ya que ese no es un valor reactivo.

Entonces no podemos al provider del contexto como el componente más externo, ya que necesitamos de alguna forma pasar un valor reactivo a ese elemento, y como vimos, los elementos reactivos los obtenemos de `useState` o de las props.

Podemos sin embargo, envolver a ese elemento en otro, que use estados. Este es el rol que `ModelContextProvider` juega en nuestro código. Se llama de esa forma porque este tipo de componentes suelen ser considerados una forma de proveedores personalizados. Su rol principal suele ser envolver al provider del contexto creado, pasandole valores reactivos, generalmente guardados en un estado.
Entonces al tener algo como:
```js
const ModelContextProvider = ({ children }) => {
    const [ctxMessages, setCtxMessages] = useState([...messages]);

    return createElement(ModelContext.Provider,
        {value: { ctxMessages, setCtxMessages }},
        children
    )
}
```
Ya estamos logrando que los valores pasados sean reactivos.

Por supuesto, podemos ir más allá y sumar funcionalidad a ese proveedor personalizado. En nuestro caso, en lugar de pasar el valor y el setter, vamos a elegir pasar el valor de los mensajes y una función personalizada para enviar mensajes. Notar que dicha función va a realizar las accione en el modelo, a la vez que mantiene sincronizado el estado del provider.

Por otro lado, vamos a seguir teniendo que estar al pendiente de los cambios en la lista de menajes, por lo que debemos mantenernos atentos a si hubieron cambios, regitrando un observador. Vamos a registrar ee observador en el `useEffect` de este proveedor peronalizado.

De esta forma, logramos mantener sincronizado el modelo con la vista, usando elementos de React y nada forzado.

> Puede leerse mucha más información en la página de documentación de React
> sobre contextos, que son uno de los temas más complejos y avanzados.
> Por ahora alcanza con entender lo básico que acabamos de mencionar.

### Sobre modelos y vistas

React es un framework para definir la vista de aplicacione web. El modelo, en la mayoría de las ocasiones, no va a vivir en la misma máquina que la vista. El modelo MVC tiene una ventaja sustancial por sobre otros, y es que precisamente, al desacoplar los elemento, la vista puede vivir en una máquina y el modelo en otra, conectandosé gracias al controlador a través de la red.

React no me soluciona el problema de conectarme a la red ni nada parecido, solo me da herramientas para definir la vista y solucionar los problemas de diseñar una vista que escale adecuadamente. Por lo que eventualmente podemos sumar otras libraries que provean soluciones para etos otros problemas.

Pueden haberse percatado de que, al usar el contexto, estamos duplicando el modelo, ya que debemos además realizar copias de la lista de mensajes. En una aplicación real, la lista de mensajes, es decir, el modelo real, va a vivir en el servidor. Van a haber llamadas web que debemos realizar para registrar un mensaje nuevo en el servidor, y probablemente nos mantengamos conectados a un socket para escuchar nuevos mensajes.

En estos escenarios, lo que tenemos en la máquina del usuario no es el modelo, son solo copias parciales del modelo, para poder presentar esos datos en la pantalla. Y está muy bien, porque precisamente es lo que queremos. En estos escenarios, almacenar directamente en un estado en un contexto los mensajes, es perfectamente válido, y lo que copiamos son los datos del servidor, no de otra variable local.

Entonces el MVC en React funciona muy distinto. Mi App react va a ser solo el V, y algo de C, y tal vez tenga copias parciales del M para presentarlas. Pero voy a tener del lado del servidor el M, y más C. Entonces va a haber una interacción constante entre cliente y servidor, cuando se necesitan cosas nuevas del modelo.

Por supuesto, estamos mencionando el caso de uso más común. Nada implica que no pueda, como vimos, realizar una aplicación 100% del lado del cliente. Incluso hay tencologías como ReactNative que me permiten hacer aplicaciones que corren en un celular, y ahí puede haber un modelo completamente local.

## Etapa 20: Mejorando con JSX

En esta etapa veremos como agregar JSX a nuestro código de vista, y veremos como eso mejora la legibilidad y la estructura del código.

### JSX

JSX (Javascript Syntax eXtension, o a veces también JavaScript Xml), es una extensión del lenguaje JavaScript que permite incluir elementos con una sintaxis similar a XML (Recordemos que HTML es un subconjunto de XML) para poder definir elementos del DOM.

Con JSX, el siguiente código:
```js
const App = () => {
    // Ahora nos alcanza con utilizar el contexto
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return createElement('div', {
        className: 'w-100 d-flex flex-column p-2'
    },
        createElement(MessagesListBox, {
            messages: ctxMessages
        }),
        createElement(SendMessageBox, {
            onMessageSend: ctxSendMessage
        }),
    );
};
```

Puede ser escrito como:
```js
const App = () => {
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return (
        <div className="w-100 d-flex flex-column p-2">
            <MessagesListBox messages={ctxMessages} />
            <SendMessageBox onMessageSend={ctxSendMessage} />
        </div>
    )
};
```

La idea es que el XML/HTML que se define, será transformado en un proceso de compilación/transpilación en el código subyacente correspondiente. Por lo tanto JSX es una herramienta que requiere un pre-procesado del código. Los navegadores web no entienden JSX directamente, debiendo entonces transformar el código en un JS tradicional para que todo funcione.

JSX fue concebido por la gente de React, e inicialmente cada nodo del XML escrito se transforma en una llamada a `React.createElement`. Sin embargo, JSX se ha transformado en una extensión del lenguaje utilizada no solo por esta herramienta, sino también por otras. Cada herramienta puede definir la forma en la que los nodos de XML son transformados, ya que la sintaxis de JSX no dice nada sobre el código subyacente de los mismos. Así, podríamos incluso crear un transpilador que transforme JSX a llamadas de `UILibrary.createElement` para poder usar JSX con nuestra library de UI que creamos. Por supuesto, esto es una tarea demasiado compleja, que no vamos siquiera a considerar encarar.

En JSX cada nodo será transformado a una serie de llamadas anidadas, donde el nombre de la etiqueta será el primer argumento, y donde el segundo argumento será un objeto que se forma con las claves de cada uno de los atributos colocados en el XML, asociados a su correspondiente valor. Cada uno de los hijos se pasa como argumentos posteriores a la función.

Los valores usados en los atributos se escriben con comillas dobles, y se pasan como strings. El texto plano en un hijo, también es pasado como un string. Si se necesita pasar algún otro tipo de dato que no sean strings, se debe utilizar un salvoconducto para poder escribir código JavaScript en el medio de ese XML.

Para eso, se pueden utilizar llaves. Al abrir una llave en el medio de un XML, el texto a continuación y hasta el cierre que coincide con esa llave, se corresponde a código JS. Cualquier código es válido, el uso de una variable, un literal, una función o una llamada a función.

Un detalle es que, en el medio de JSX, todo el código JS es considerado una expresión. No pueden, sin embargo, utilizarse comandos, como un while, o un if. Sin embargo se pueden lograr alternativas usando la alternativa de expresiones (El operador ternario `?:`), y lograr repeticiones (o algo similar) usando listas y la función `map` para transformarlo a una expresión.

Notar que los archivos de JSX no pueden usar la extensión `.js` tradicional. Para identificar su naturaleza se utiliza la extensión `.jsx`.

### Transpilado de JSX

Como dijimos, JSX no es entendido por los navegadores, y por tanto se necesita un proceso de transpilación para lograr que ese código se transforme en un archivo de JS que el navegador pueda ejecutar.

Existen varias herramientas que pueden usarse para transformar JSX a JS, y una de ellas es Babel. Babel es un transpilador de JS que usa un sistema de plugins para adaptarse a las necesidades de transpilación específicas. Vamos a usar Babel para transpilar JSX en este caso.

Pero para hacerlo, necesitamos primero descargar Babel a nuestra máquina. Pero no es solo Babel, también debemos descargar los plugins necesarios para trabajar con JSX pensando en que lo que se genere sea código React.

Babel se distribuye vía npmjs, y por lo tanto puede descargarse por `npm`, el manejador de dependencias que viene por defecto con Node, o con cualquier otro manejador de dependencias que trabaje descargando de npmjs, como `yarn` o `pnpm`. Y por supuesto, para utilizar este manejador, vamos a necesitar tener Node instalado en nuestra máquina.

Para declarar las dependencias que necesitamos y que sea fácil instalarlas, vamos a agregar un archivo `package.json` que liste las dependencias necesarias.

El primer paso entonces será entrar a la terminal, ir a la carpeta del proyecto y correr el comando necesario para instalar las dependencias.
```sh
npm install
```

Luego, una vez todo se haya instalado, podemos correr el comando para compilar el archivo `view.jsx`:
```sh
npx babel view.jsx --out-file view.js --presets=@babel/preset-react
```

Para mayor facilidad, se incluyó un "script" con dicho comando en el `package.json` bajo el nombre de start. De esta forma, podemos ejecutar el siguiente comando, para obtener exactamente el mismo resultado:
```sh
npm start
```

Si todo fue bien, deberían ver el archivo `view.js` como resultado en la carpeta. Esto va a permitir que la página funcione, de la misma forma que lo hacía en la etapa anterior, ya que la totalidad del código producido es idéntico al que existía antes.

> Si se abre el archivo `view.js` se va a poder observar que el código
> producido es idéntico al código que teníamos antes, con excepción de
> la indentación y algunos compentarios puntuales que agrega Babel.

### Sobre React y JSX

Cuando leemos sobre React nos vamos a encontrar que prácticamente toda la documentación que se presenta, todos los ejemplos que existen, utilizan JSX.
No vamos a encontrar prácticamente ejemplos de React usando `createElement`, ya que la filosofía React implica usar un proceso de transpilación.

Es importante entender qué cosas provee React, y que beneficios trae JSX al trabajar con un framework así. Sin embargo, también es importante que quede claro que React y JSX no son la misma cosa, y que puede usarse React sin JSX, o JSX sin React. Sin embargo, también es interesante destacar como JSX complementa React (al fin de cuentas fue pensado para hacerlo), y como esto simplifica el código que escribimos, dando lugar a código que comunica mejor las ideas y es más mantenible y extensible.


## Etapa 21: Sumando un bundler

En esta etapa vamos a ver como los bundlers nos facilitan el proceso de desarrollo y vamos a incorporar uno a nuestro proyecto.

### Los bundlers

Un bundler es una herramienta que se dedica a empaquetar una amplicación está compuesta de multiples elementos, de una forma coherente y ordenada. Adicionalmente, muchas de estas herramientas permiten ser configuradas para realizar pasos de pre y post empaquetado, pudiendo por ejemplo, indicar cómo se compila la aplicación, etc.

Existen muchos bundlers para JavaScript, como Rollup, Webpack, ESBuild, etc. Cada uno tiene sus particularidades, y sus formas de configurarse, además, en muchas ocasiones, de un ecosistemas de plugins muy rico que permite agregar funcionalidades.

**Vite** es uno más de los bundlers disponibles. Moderno, rápido, y facilmente configurable "out-of-the-box", hace que sea una opción atractiva. Hoy en día es la herramienta por defecto para quienes inician en el mundo React.

> Hace algunos años, la herramienta por defecto era create-react-app (CRA).
> Esta herramienta permitía arrancar un proyecto de React de forma sencilla,
> configurando Webpack como bundler, pero ocultando la configuración de este,
> ya que en general, es sumamente complejo de configurar.
>
> Es probable que al buscar documentación, se encuentren cosas viejas que
> hacen uso de CRA. Recomendamos se piense sobre lo que se lee y se adapte a
> las nuevas tecnologías, ya que CRA ya no está soportado.

Vite propone una organización específica de los archivos, lo que ordena el desarrollo, pero cambia un poco lo que veníamos haciendo hasta ahora. Lo único que va a quedar en la raíz del proyecto va a ser nuestro `package.json`, declarando las dependencias y scripts necesarios, y el `index.html` que contiene la estructura del HTML principal.

Sin embargo, nos vamos a encontrarcon que si intentamos acceder al HTML directamente, no va a funcionar. Ese HTML está pensado para el proceso de desarrollo, pero no para ser usado directamente. Para la versión final del código, la que vamos a colocar en un servidor para que los usuarios puedan usar, el mismo va a ser masticado y transformado ligeramente. En particular, se van a modificar los scripts, agregandosé las versiones transpiladas del código.

Además vamos a encontrar un archivo con el nombre `vite.config.js`. Este archivo contiene un objeto exportado que se corresponde a la coniguración de Vite. Si hubiera que modificar el comportamiento por defecto del bundler, este sería el archivo a modificar. De hecho, hemos hecho algunos cambios en el mismo, de la versión por defecto, para que todo funcione con nuestros ejemplos.

Por otro lado, todos nuestros scripts van a vivir en una carpeta bajo el nombre de `src`. En esta versión, copiamos exactamente los mismos scripts que teníamos, y les hicimos mínimas modificaciones. Hay, sin embargo, un nuevo script, bajo el nombre de `main.tsx`. Dicho script va a actuar de punto de entrada de nuestra aplicación.

> Podría configurarse Vite para usar otro archivo, pero decidimos dejar
> `main.tsx` como punto de entrada. Más adelante modificaremos la organización
> de otros archivos también.

Nuestros estilos de CSS ahora viven en una carpeta bajo el nombre de `public`.

### Imports reales

Una de las cosas interesantes que surgen del uso de bundlers es que ahora nuestro código puede hacer verdadero uso de imports, no debiendo recurrir a guardar objetos en window.

Los imports funcionan porque el bundler se va a encargar de procesar el código, generando en verdad un único archivo con el contenido total de todos los archivos que necesitamos, e incluso de dependencias externas, como React o ReactDOM.

> Nuevamente, todo es configurable, podríamos no incluir React en el archivo
> final, y cargarlo desde un archivo externo en una CDN, como hicimos en
> etapas anteriores. Es una decisión personal sobre como encararlo.

El bundler entonces, se encargará de analizar los imports, y organizar cual es el código de los archivos que deben ser puestos primero, cuales despues, realizar lo renombre necesarios, validar que solo se usen elementos exportados, etc. Todo al momento de producir el archivo final (llamado muchas veces "bundle").

Esto trae aparejado poder usar la sintaxis de ESM para modulos, y poder importar en base al nombre de un archivo, ya sea local, o de las libraries declaradas en el `package.json`. Sumado a esto, podemos usar la sintaxis de export de ESM, declarando en el momento que exportar, o realizar exports por defecto.

### Cambios realizados en el código.

Con el bundler en su sitio, fuera de mover los archivos de lugar, el código ha cambiado poco. Esta vez, usamos imports y exports de ESM para solicitar dependencias.

Por otro lado, hemos movido la invocación a `createRoot` y su correspondiente `render` al archivo `main.jsx` como es común. Allí, simplemente importamos tanto a App como al contexto, para obtener los componentes principales a utilizar.

Luego de esto, nada más ha cambiado.

### Crear un proyecto que usa un bundler

Arrancar de cero un proyecto usando un bundler es complicado, ya que en general implica definir un `package.json` con todas las dependencias necesarias, crear el archivo de configuración apropiado para la herramienta, configurar los scripts para las diferentes acciones comunes durante el desarrollo, etc.

Vite, por suerte, lo pone muy simple. Basta invocar al comando
```sh
npm create vite
```

Inmediatamente la terminal nos realizará un par de preguntas sobre la configuración de nuestro proyecto, y tras contestar, se creará una nueva carpeta con el proyecto, y los pasos para inciar el proceso de desarrollo.

Nosotros elegimos una configuración que incluía React usando JavaScript (sin SWC), y llamamos al proyecto v21 (con lo cual, se creo el proyecto en una carpeta del mismo nombre).

Luego modificamos `package.json` para eliminar elementos que no vamos a usar, como el linter, y borramos archivos innecesarios. Cambiamos ligeramente la configuración inicial de `vite.config.js` y trajimos nuestros archivos de etapas anteriores al proyecto, en las ubicaciones adecuadas (y realizamos las modificaciones menores al código ya mencionadas).

Con esto, nuestro proyecto está listo para funcionar. Vite provee en los scripts del `package.json` (por defecto), 3 tareas muy útiles:
* dev: Que inicia un servidor en modo desarrollo. Este comando es ideal para poder ver nuestro trabajo mientras estamos modificando el código. Los cambios se visualizan en vivo en el navegador, y el servidor lo maneja automáticamente Vite.
* build: Este comando va a producir una carpeta `dist`. Dicha carpeta va a tener la versión final de nuestra aplicación React, incluyendo el HTML, los archivos CSS, JS, etc. Esto es lo que pondríamos en un servidor para que el usuario final acceda.
* preview: Este comando nos permite levantar un servidor para visualizar la versión que se produjo con build. En ocasiones, pueden haber detalles de la versión producida con `build` que no podemos apreciar en el proceso de desarrollo. Por ej. Cuanto pesan los archivos finales, cuanto tardan en cargarse, etc.

Podemos correr estos scripts con el comando:
```sh
npm run dev
```
```sh
npm run build
```
y
```sh
npm run preview
```
correspondientemente.

> Si intentaron acceder mediante siguiente, desde la versión anterior, van
> a ver que la carpeta buscada es `v21/dist`. Por defecto la carpeta
> no existe. Por lo que van a tener que transpilar el código para poder
> ver esta versión de la app andando. Entren con una terminal y corran
> el comando `npm run build`.

Con esto ya estamos practicamente como queremos, pero podemos hacer más...


## Etapa 22: Mejorando con TypeScript

Nuestro código funciona bien, pero podemos mejorarlo ligeramente, aumentando la confiabilidad de nuestro programa, al cambiar JS por su contraparte tipada, TypeScript.

### Posibles problemas de tipado

Pensemos en el caso de definir props. Cuando decimos algo como:
```js
const Message = ({ side, message, date, sender }) => ...
```

Estamos aasumiendo que el argumento que nos va a llegar, va tener una forma determinada. ¿Qué sucede si quien invoca a la función no pasa el objeto con la forma esperada? Nuestra interfaz mostrará elementos vacíos, o incluso peor, podría fallar de forma irrecuperable.

Sería ideal poder validar este tipo de cuestiones. Hay, claro, herramientas para hacerlo en JS, en tiempo de ejecución. Pero esto implica un overhead en la aplicación, ya que no solo estará dedicandosé a ejecutar el código de las caracteristicas funcionales del programa, sino que además estará constantemente ejecutando código para validar argumentos (en cada llamada al componente) que, en principio, si se usan bien desde la estructura, siempre van a estar bien.

Hemos tenido mucho cuidado de no producir código con errores en estos ejemplos. Pero cuando uno desarrolla sistemas grandes, es un problema común y muy dificil de evitar sin usar algún tipo de herramienta.

### TypeScript

TypeScript (TS) nos va a permitir escribir un programa JS con anotaciones de tipos. Al compilar un programa con TypeScript se va a producir el archivo JS tal cual lo tenemos ahora, pero durante el proceso de compilación, se va a verificar que no estemos incurriendo en errores de tipo en ningun lugar del código.

TypeScript va a validar los tipos en tiempo de compilación, por lo que garantiza que la estructura del código es correcta al momento de producir los archivos JS. Al mismo tiempo, los archivos producidos no presentan ningún overhead sobre su ejecución, siendo iguales a los que podríamos haber programado manualmente.

Usar TypeScript nos da ciertas garantías sobre nuetro código, pero conlleva problemas. Ya no podremos utilizar directamente los archivos que escribimos, sino que vamos a requerir un pre-procesado de los archivos. Esto es así porque debemo "compilar" nuestro código TS para producir el JS que el navegador espera (Los navegadores no son capaces de ejecutar TS).

Pero, a esta altura, ya estamos haciendo esto con Vite, que por debajo utiliza diversas herramientas, como Rollup o Babel, para transpilar nuestro código JSX a JS. Basta configurar Vite para que también compile TS.

Y como no podía ser de otra manera, así como existe JSX, también existe TSX. Es decir, podemos usar nuestras cómodas anotaciones XML en el medio del código TypeScript. El compilador de TypeScript ya trae incluida la capacidad de transpilar este XML, lo cual, nos permite usar solo el compilador de TypeScript sin necesidad de herramientas como Babel.

El compilador de TypeScript se conoce como `tsc`, y es un compilador sumamente configurable. Hay tantas opciones, que configurarlo desde la línea de comandos no es una opción viable ni cómoda. Por eso, el compilador intenta como primer paso buscar un archivo de configuración en la carpeta raíz del proyecto, bajo el nombre de `tsconfig.json`. Este archivo contendrá la configuración de cómo ejecutar el compilador para el proyecto actual.

En el caso de Vite, al decirle que queremos configurar un nuevo proyecto usando TypeScript y React, nos crea no solo la misma estructura que habíamos visto antes, sino también el archivo `tsconfig.json`. A su vez, este archivo tiene una configuración minimalista, que hace uso de otros dos archivos de configuración auxiliares: `tsconfig.app.json` y `tsconfig.node.json`. El primero tiene la configuración para compilar nuestra app de react. El segundo presenta la configuración para levantar el servidor de desarrollo que provee vite.

Por último, vite va a agregar un archivo `src/vite-env.d.ts` que contiene una anotación mínima, y que va a permitirnos usar los tipos de vite en nuestro proyecto, si necesitaramos. En general se recomienda no tocar esa configuración, ni usar esos tipos, salvo que sepan muy bien lo que están haciendo.

### Anotaciones de tipos

Nuestro código debe cambiar en dos formas. En primer lugar, deberemos cambiar las extensiones de nuestros archivos. Los archivos cuya extensión era `.js` pasarán a ser `.ts`, mientras que los que eran `.jsx` pasarán a ser `.tsx`.

Una vez hecho ese cambio, podremos comenzar a agregar las anotaciones de tipos. Lo que se espera es que se indique el tipo de los parámetros en las funciones, así como de variables y otros elementos, siempre y cuando no sean inferibles por TS.

Al hacer esto, puede que encontremos errores en nuestro código que antes no habíamos detectado.

> Transformar un proyecto que estaba escrito en JS en TS es un
> proceso engorroso. En general suelen aparecer muchos errores,
> y las cosas no tipan. Lo ideal, por supuesto, es comenzar
> desde el momento cero utilizando TypeScript. Eso nos va a
> permitir generar código seguro desde el día uno.

Hemos realizado el tipado de la totalidad de nuestro código. Solo nos falta reordenar un poco los archivos, para poder tener una App React hecha y derecha.


## Etapa 23: Acomodando los archivos

En esta etapa simplemente moveremos los nuestro contenido a varios archivos, para acomodar la aplicación a algo más común, en términos de cómo se suele trabajar en React, y veremos algunas convenciones.

### Moviendo los elementos de lugar

Si bien cada proyecto puede acomodar el código como le resulte conveniente al equipo de desarrollo, hay ciertas prácticas que son bastante aceptadas por la mayoría de los equipos, pues brindan de alguna manera cierta seguridad y previsibilidad sobre dónde deberían estar los elementos.

Así, cuando se trabaja con React se suelen esperar varias cosas:
* `main.tsx` es quien crea la aplicación y lanza el render inicial. También importa estilos globales si los hubiera, e inicializa otros elementos globales (en nuestro caso lanza la simulación de envío de mensajes del servidor).
* El componente App está ubicado en la raíz de `src`. Se espera sea un único componente, y que no hay otros componentes por fuera, salvo que sean contextos globales (aunque hay otra corriente que dice que los contextos deberían estar dentro de App).
* Cada componente visual vive en un archivo que tiene su nombre, en una carpeta del mismo nombre, dentro de una carpeta `Components` o `components` dentro de `src` (ej. src/Components/Message/Message.tsx).
* La carpeta de componentes podría hacer uso de subcarpetas cuya única función sea agrupar componentes relacionados.
* Los contextos viven en una carpeta aparte. Dependiendo de su complejidad, puede haber una carpeta por contexto, o pueden estar agrupados por archivos. No hay una convención muy fuerte acá.
* Los tipos y datos del modelo suelen estar agrupados dentro de una carpeta `Models`, `models`.
* Los elementos que se comunican con algún servicio remoto suelen agruparse bajo una carpeta `APIs` o `apis`.

Reorganizamo el código de la aplicación para seguir un poco estas convenciones.

Esto implica exportar cada uno de nuestros componentes, ya que ahora viven todos en archivos distintos, así como también otros elementos que ahora pasaron a su propio archivo.

Por otro lado, la cantidad de imports en los diversos archivos ha crecido, ya que hay que referenciar más elementos de otros archivos.

Fuera de eso, el código no ha cambiado, salvo por el punto en el que se activa la recepción de mensajes, que se ha movido a `main.tsx`.


## Etapa 24: El Barrel Pattern

El barrel pattern es uno de los patrones de diseño más utilizados en el universo JS. En esta etapa aprenderemos sobre el mismo.

### El problema de los imports por archivo

Si bien con la nueva ubicación de nuestros archivos se vuelve mucho más fácil encontrar la función o el componente que queremos desde el sistema de archivos, vamos a observar que los imports empiezan a volverse complejos.

Ahora, cada elemento que utilizamos que no esté en el archivo local, requiere un import. En un sistema verdaderamente grande, esto podría implicar decenas de lineas de importación.

### Convirtiendo carpetas a modulos

Por suerte, JS (Y también TS) tiene una solución para eso.

Por defecto, JS trata como módulos importables a los archivos. Sin embargo, podemos hacer que trate a una carpeta como un módulo. Para indicarle que una carpeta debe ser tratada como un módulo, basta agregar un archivo bajo el nombre `index.js` (o `index.ts` en TS) a la carpeta.

El hecho de que una carpeta sea un módulo implica que la podemos importar. Es decir, que a partir del momento que agregamos un archivo `index.ts` a nuestra carpeta "src/Components/Message" podemos elegir importar dos cosas:
* `./Components/Message/Message`, que importará el archivo `src/Components/Message/Message.tsx` con el componente.
* `./Components/Message`, que importará el archivo `src/Components/Message/index.tsx`, de momento vacío.

### Re-exports

Pero entonces, ¿De qué nos sirve? Bien, en JS/TS podemos re-exportar todo lo que otros archivos exportar de la siguiente forma:
```js
export * from './Message';
```
Si colocamos una re-exportación con esa forma en nuestro index.ts en la carpeta Messages, entonces estamos diciendo que el componente en `Messages.tsx` puede importarse también como `./Components/Message`.

Pero podemos ir un paso más allá, y agregar un `index.ts` en la carpeta Components, que tenga varios re-exports, uno para cada componente. Eso quiere decir que ahora podemos re-exportar la totalidad de los componentes en ese archivo, y que por tanto podemos importar cualquier componente desde `./Components'.

Esto simplifica muchisimo las importaciones, logrando rutas más cortas, pero también pudiendo realizar multiples importaciones de elementos en diferentes archivos desde un mismo módulo carpeta.

### Default exports vs Named exports

Para que este modelo de re-exportación de múltiples archivos en un modulo carpeta funcione, los archivos no deben realizar exportaciones default. Al re-exportar dos o más archivo con default, un módulo carpeta no podría determinal cual debería ser su default. Por lo tanto solo se permiten exportaciones por nombre.

### Barrel Pattern

Este patrón de exportación se conoce como el **Barrell Pattern**. No solo es útil para reducir las líneas de import, sino que permite efectivamente tratar a una sub-carpeta como un modulo independiente.

En lugar de que el archivo index re-exporte todo, podría elegir re-exportar solo ciertos elementos. Si quienes importan, importan el módulo carpeta en lugar del archivo, solo verán lo que los autores de la carpeta módulo esperan que vea.

Esto permite mayor nivel de abstracción entre diferentes módulos o partes del sistema, aunque no es un mecanismo del lenguaje, sino que depende de la buena práctica de los programadores.


## Etapa 25: Cierre y conclusiones

Con la versión anterior, es hora de dar cierre a nuestra aplicación, y analizar algunas conclusiones de todo este proceso.

### Conclusion 1:

Es muy común que al aprender un framework como React se nos enseñe a usarlo, más no el por qué de su existencia. Si nunca hemos trabajado en desarrollo web, y no nos hemos enfrentado a los problemas que hemos visto a lo largo de este proceso, es fácil pasar por alto la gran cantidad de beneficios que un framework web aporta al desarrollo.

Problemas como el two-way binding, o cuándo realizar un re-renderizado, como conciliar el DOM con los datos, son facilmente pasado por alto cuando jamás se ha trabajado sin herramientas que solucionen estos problemas.

En las últimas versiones de React se favorecen los componentes funcionales y el uso de hooks. Hoy, cuando se aprende react, solo se enseña a utilizar `useState`, pero pocas veces se explica por qué se requiere un hook que solucione el problema del estado.

A lo largo de este proceso heos visto los diferentes problemas que surgen, y si bien puede que jamás se hayan topado con ellos en un contexto real, al menos tendrán una idea de su existencia, y una mejor comprensión sobre lo que herramientas como React vienen a solucionar.

### Conclusión 2

Es muy común pensar que herramientas como React son mágicas, que hacen cosas que serían imposibles de realizar si esa herramienta no existiera.

Sin embargo, vimos paso a paso como construir una library para nuestra UI que brinda de forma muy precaria la mayoría de las funcionalidades que conseguimos con React. Con esto se busca desmitificar la herramienta.

React no tiene nada de mágico. Al igual que cualquier library, hay código detrás. Cuando el código es mucho, y hay muchisimas funciones y formas diferentes de hacer las cosas, puede parecer que hasta etamos programando en un lenguaje diferente al que conocemos. Sin embargo, siempre serán abstracciones sobre elementos que conocemos.

Al aprender una library se debe aplicar el concepto de caja negra, es decir, no me interesa como está hecho, lo uso y listo. Sin embargo, no debemos caer en el cajanegrismo, es decir, no tengo ni idea de por qué la library funciona, pero igual la uso. Es importante contar siempre con una idea elemental (mínima, una idea, no conocimiento en profundidad) de cómo operan las cosas de forma subyacente, y no confiar ciegamente en que funcionan.

### Conclusión 3

Cuando escribimos código react parece que programamos en otro lenguaje, y eso es porque, en general, lo és. JSX es otro lenguaje (es una extensión de JS), y requiere un compilador/transpilador para ser procesado.

Lo mejor para trabajar con otros lenguajes es utilizar un bundler, que me ordena el proceso de build, además de traerme otros varios beneficios. Cuando creamos una app Vite, estamos eligiendo usar un bundler, un lenguaje como TypeScript, soporte para JSX, etc.

Usar herramientas y lenguajes más avanzados, hace más fácil y ordenado el proceso de desarrollo, permitiendo hacer soluciones más escalables y mantenibles en el tiempo.

### Cierre

Espero este pequeño paseo por las ideas fundamentales de los frameworks web les haya servido y les permita entender mejor los elementos con los que se trabajan al hacer interfaces web modernas.
