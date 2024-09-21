/****************** Utilidades ***********************/
/* Estas son funciones o elementos que en general definiríamos
   en un archivo aparte, o que tomaríamos de una library de
   terceros. En este caso, y por simplicidad, vamos a definir
   estas funciones acá mismo */

/**
 * Describe un número entero aleatorio entre dos enteros.
 * @param {number} min - El mínimo valor que puede tomar el número aleatorio.
 * @param {number} max - El máximo valor que puede tomar el número aleatorio.
 * @returns Un nuevo valor aleatorio
 */
const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/****************** Main Contents ***********************/
/* Este va a ser el contenido principal de nuestra aplicación.
   En estas variables y funciones vamos a simular la lógica de
   el envío y recepción de mensajes. */

/* Simple helpers */
/* Para evitar caer en que la aplicación sea má compleja de lo que
   necesita a nuestros efectos, vamos a pre-definir los nombres de
   los usuarios que están chateando. Nosotros seremos Alice, mientras
   que la persona con la que chateamos será Bob. Estas variables sirven
   solo para poder abstraerme de esos nombres más adelante, y poder
   usar directamente la variable. */

/** El nombre del usuario local del chat */
const localName = 'Alice';
/** El nombre del usuario remoto del chat */
const remoteName = 'Bob';

/* Estos elementos estarían en una aplicación real JS. Como estamos en la
   máquina del cliente, incluso si los mensajes se envían y reciben de un servidor,
   vamos a necesitar una copia local de los mismos para poder mostrarlos. Lo mismo
   vamos a necesitar funciones para enviar y recibir un mensaje. */

/**
 * La lista de mensajes que fueron enviados.
 * Cada mensaje consiste en un objeto de la forma:
 * `{ sender: string, date: Date, message: string }`
 * @example `{ sender: 'Alice', date: new Date(), message: 'Hola, bob'}`
 *
 * Por ahora no hay mensajes.
 */
const messages = [];

/**
 * Un objeto cuyos contenidos representan el texto que el usuario
 * ingresó en el cuadro de texto del chat. Si bien podríamos elegir
 * que el texto se pase directamente a `sendMessage`, elegimos tener
 * esta variable para demostrar algunas cosas de los frameworks web.
 */
const writtenMessage = {
    contents: ''
};

/**
 * Esta función es la que se dedica e enviar un mensaje.
 *
 * En un aplicación real, esto no solo modificaría el estado local,
 * sino que además se comunicaría con el servidor para sincronizar los menajes.
 * Nosotros solo vamos a modificar el estado local, agregando un nuevo objeto.
 *
 * El objeto que agregamos es bastante fijo: el sender siempre es el nombre del
 * usuario local, la fecha siempre es la fecha actual, y el texto siempre será
 * el valor de los contenidos de `writtenMessage`.
 *
 * Vamos agregar una verificación mínima. Los contenidos no pueden
 * ser vacíos al momento de enviar un mensaje. Entonces, luego de
 * mandar un mensaje, los contenidos escritos deberían limpiarse,
 * para evitar que se envíen dos veces el mismo mensaje.
 */
const sendMessage = () => {
    if (writtenMessage.contents) {
        const msgToSend = {
            sender: localName,
            date: new Date(),
            message: writtenMessage.contents
        }
        sendMessageToServer(msgToSend);
        messages.push(msgToSend);
        writtenMessage.contents = '';
    }
}

/**
 * Esta función es la que se dedica a recibir un mensaje.
 *
 * En una aplicación real, se comunicaría con el servidor para recibir el mensaje.
 * Nosotros vamos a simular dicha conexión. Para ello vamos a contar con una función
 * que simula recibir un mensaje del servidor.
 *
 * Luego, simplemente agregamos el mensaje recibido a la lista de mensajes,
 * actualizando el estado local.
 */
const receiveMessage = () => {
    const msgReceived = receiveMessageFromServer();
    messages.push(msgReceived);
}

/****************** Server simulation ***********************/
/* Toda esta sección contiene las funciones que simulan la interacción con
   el servidor. Estas funciones son las que efectivamente se comunicarían
   con un server, si hubiera uno. Podríamos, el día de mañana, cambiar
   el comportamiento de estas funciones para que trabajen con un servidor
   real, y nuestra aplicación seguiría funcionando. */

/**
* Simula el envío de un mensaje del usuario local al servidor.
*/
const sendMessageToServer = (msgToSend) => {
    // SImular enviar un mensaje al servidor
    // consiste en no hacer nada.
}

/**
* Simula ela recepción de un mensaje del usuario remoto desde el servidor.
* @returns Un mensaje
*/
const receiveMessageFromServer = () => {
    // SImular la recepción de un mensaje
    // consiste en generar un mesaje de forma aleatoria.

    // Vamos a contar con una serie de mensajes ya predefinidos,
    // y vamos a elegir uno de todos estos.
    const msgs = [
        'Hola', 'LOL',
        '¿Cómo estás?', '¿Qué sucede?', '¿Puedo ayudarte?',
        'Claro, ya estoy en eso', 'Enseguida', 'No hay problema',
        'Sería interesante lograrlo', 'Vamos a hacerlo',
        'No molestes', 'No estarías siendo útil',
        'No pienso hacerlo', 'No quiero',
    ];
    // Elegiremos de forma aleatoria un indice de la lista
    const randIndex = randomIntBetween(0, msgs.length - 1);
    // Y tomaremos un mensaje de la lista en base a ese indice
    const msg = msgs[randIndex];

    // Devolvemos un nuevo mensaje, donde el sender siempre es el
    // usuario remoto, la fecha siempre es la actual, y el mensaje
    // es el que elegimos de forma aleatoria
    return {
        sender: remoteName,
        date: new Date(),
        message: msg
    };
}

/**
 * Simula la interacción constante con el servidor.
 *
 * En el mundo real, nos van a llegar mensajes del servidor en cualquier momento.
 * Esta función, al ser llamada, comenzará un proceso en el cual, cada cierto
 * tiempo (entre 5 y 15 segundo de forma aleatoria) recibirá un nuevo mensaje.
 *
 * Una vez llamada a la función, la interacción con el servidor comienza, y no
 * hay forma de detener la interacción.
 */
const triggerMessageReception = () => {
    const seconds = randomIntBetween(5, 15);
    setTimeout(() => {
        receiveMessage();
        triggerMessageReception();
    }, seconds * 1000);
}
