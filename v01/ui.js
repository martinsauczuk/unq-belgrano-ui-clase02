/*
 * Este archivo define la parte de la interfaz gráfica,
 * es decir, los elementos web que vamos a utilizar.
 * En este archivo, vamos a manipular el DOM creando
 * todos los elementos que forman parte de la aplicación.
 *
 * Partimos de la base de haber realizado en HTML una muestra
 * de lo que queremos, por lo que, vamos a trabajar con el DOM
 * para lograr que se creen elementos con la misma estrcutra.
 *
 * Al mismo tiempo seguiremos un esquema de componentes, es decir,
 * de funciones que, dado un elemento que actúa de padre, agregan
 * a este todos los elementos que conforman el componente. Cada componente,
 * además de su documentación, tiene al comienzo un comentario que nos
 * ayuda a seguir el HTML a lograr.
 *
 * Vamos a hacer alto uso de los estilos de bootstrap, por lo que no
 * necesitaremos definir nuevo CSS fuera del que da estructura general
 * a la app y que ya usamos antes.
 *
 * Este archivo es conveniente leerlo desde abajo hacia arriba, para entender
 * como los elementos se van anidando entre si.
 */

/**
 * El componente Message es un componente que se encarga de mostrar efectivamente
 * un mensaje, con el contenido del sender, la hora y el texto del mensaje.
 *
 * Para mostrarse se usa un "toast" de bootstrap. El color del toast depende de
 * si el mensaje está alineado a la izquierda o a la derecha, por lo que se debe
 * recibir también el lado hacia el cual se muestra este mensaje.
 *
 * @param {*} side - El lado hacia el cual alinear el mensaje, uno de 'left' o 'right'.
 * @param {*} parentElement - El elemento en donde se agregarán los contenidos de este componente
 */
const Message = (side, parentElement) => {
    /*
    <div class="toast show" role="alert">
        <div class="toast-header">
            <strong class="me-auto">Sender</strong>
            <small>11:45:23</small>
        </div>
        <div class="toast-body">
            Texto del mensaje
        </div>
    </div>
    */
    const bgColor = side === 'left' ? 'text-bg-success' : '';

    const container = document.createElement('div');
    container.setAttribute('class', 'toast show m-1 ');
    container.setAttribute('role', 'alert');

    const header = document.createElement('div');
    header.setAttribute('class', 'toast-header ' + bgColor);

    const body = document.createElement('div');
    body.setAttribute('class', 'toast-body ' + bgColor);
    body.textContent = 'Texto del mensaje';

    const senderText = document.createElement('strong');
    senderText.setAttribute('class', 'me-auto');
    senderText.textContent = 'Sender';

    const dateText = document.createElement('small');
    dateText.textContent = '11:45:23';

    header.appendChild(senderText);
    header.appendChild(dateText);

    container.appendChild(header);
    container.appendChild(body);

    parentElement.appendChild(container);
}

/**
 * El componente MessageContainer es un componente que se encarga de contener un
 * mensaje en la lista de mensajes. Este componente es el encargado de alinear
 * el menaje en si, ya ea a la derecha o a la izquierda.
 *
 * @param {*} side - El lado hacia el cual alinear el mensaje, uno de 'left' o 'right'.
 * @param {*} parentElement - El elemento en donde se agregarán los contenidos de este componente
 */
const MessageContainer = (side, parentElement) => {
    /*
     <div class="d-flex flex-row m-1 justify-content-start|end">
        <Message side="left|right"/>
     </div>
    */
    const justifyAt = side === 'left' ? 'start' : 'end';

    const container = document.createElement('div');
    container.setAttribute('class', 'd-flex flex-row m-1 justify-content-' + justifyAt);

    Message(side, container)

    parentElement.appendChild(container);
}

/**
 * El componente MessagesListBox es el elemento encargado
 * de mostrar una lista de mensajes.
 *
 * Por ahora vamos a poner un par de mensajes cualquiera, ya
 * que nos interesa es ver que podamos recrear la estructura del HTML en
 * JS.
 *
 * @param {*} parentElement - El elemento en donde se agregarán los contenidos de este componente
 */
const MessagesListBox = (parentElement) => {
    /*
     <div class="flex-fill overflow-auto">
        <MessageContainer side="left|right" />
        <MessageContainer side="left|right" />
        <MessageContainer side="left|right" />
        ...
     </div>
    */
    const container = document.createElement('div');
    container.setAttribute('class', 'flex-fill overflow-auto');

    MessageContainer('left', container);
    MessageContainer('right', container);
    MessageContainer('left', container);
    MessageContainer('left', container);
    MessageContainer('right', container);

    parentElement.appendChild(container);
}

/**
 * El componente SendMessageBox es el elemento encargado
 * de mostrar el input de texto para que el usuario escriba los mensajes, así
 * como el botón de "Enviar".
 *
 * @param {*} parentElement - El elemento en donde se agregarán los contenidos de este componente
 */
const SendMessageBox = (parentElement) => {
    /*
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Escribe tu mensaje aquí">
        <button type="button" class="btn btn-success">Enviar</button>
    </div>
    */
    const container = document.createElement('div');
    container.setAttribute('class', 'input-group mb-3');

    const messgeTextbox = document.createElement('input')
    messgeTextbox.setAttribute('class', 'form-control');
    messgeTextbox.setAttribute('type', 'text');
    messgeTextbox.setAttribute('placeholder', 'Escribe tu mensaje aquí');

    const sendMsgButton = document.createElement('button')
    sendMsgButton.setAttribute('class', 'btn btn-success');
    sendMsgButton.setAttribute('type', 'button');
    sendMsgButton.textContent = 'Enviar'

    container.appendChild(messgeTextbox);
    container.appendChild(sendMsgButton);

    parentElement.appendChild(container);
}

/**
 * El componente App es el elemento principal de la aplicación.
 * Se encarga de agregar tanto la lista de mensajes como la caja de
 * envío de mensajes.
 *
 * @param {*} parentElement - El elemento en donde se agregarán los contenidos de este componente
 */
const App = (parentElement) => {
    /*
     <div class="w-100 d-flex flex-column p-2">
        <MessagesBox />
        <SendBox />
     </div>
    */
    const container = document.createElement('div');
    container.setAttribute('class', 'w-100 d-flex flex-column p-2');

    MessagesListBox(container);
    SendMessageBox(container);

    parentElement.appendChild(container);
}

/**
 * Lo primero que vamos a hacer es obtener el elemento cuyo ID es root
 * en el HTML. Dentro de ese elemento cargaremos la totalidad de nuestra
 * aplicación. Es decir, que ese elemento será el parent de nuestro
 * "componente" principal, App.
 *
 * La idea de "componente" no es distinta a la idea de función. Es decir
 * cuando decimos el componente App, estamos diciendo la función App.
 * La diferencia es solo conceptual, los componentes se espera se correspondan
 * con elementos que, eventualmente, mostraran contenido en la pantalla. Pero
 * funcionan igual que cualquier función tradicional.
 */
App(document.getElementById('root'));