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
