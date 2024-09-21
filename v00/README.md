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
