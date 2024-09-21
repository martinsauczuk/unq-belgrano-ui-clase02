
/*
 En esta nueva versión de la interfáz gráfica vamos a empezar a hacer uso de la
 library de UI que acabamos de agregar. ESta library nos va a proveer, por ahora
 un mecanismo más sencillo para crear componentes, mediante la función `createELement`.
 No hay que confundir dicha función con `document.createELement`, la cual, es la que
 crea elementos del DOM, pero que no maneja la idea de agregar propiedades, hijos, etc.
 Esa función si será usada, pero internamente por la library de UI que acabamos de crear.

 Solo por esta vez, mantendremos los comentarios del HTML esperado, pero eventualmente,
 eliminaremos eso, para dejar la interfaz lo más limpia y compacta posible.
 */


const Message = (side) => (parentElement) => {
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

    const container = createElement('div', {
        'class': 'toast show m-1',
        'role': 'alert'
    }, [
        createElement('div', {
            'class': 'toast-header ' + bgColor
        }, [
            createElement('strong', {
                'class': 'me-auto'
            }, 'Sender'),
            createElement('small', {}, '11:45:23'),
        ]),
        createElement('div', {
            'class': 'toast-body ' + bgColor
        }, 'Texto del mensaje')
    ]);

    parentElement.appendChild(container);
}

const MessageContainer = (side) => (parentElement) => {
    /*
     <div class="d-flex flex-row m-1">
        <Message side="left|right"/>
     </div>
    */
    const justifyAt = side === 'left' ? 'start' : 'end';

    const container = createElement('div', {
        'class': 'd-flex flex-row m-1 justify-content-' + justifyAt
    }, [
        Message(side)
    ]);

    parentElement.appendChild(container);
}

const MessagesListBox = () => (parentElement) => {
    /*
     <div class="flex-fill overflow-auto">
        <MessageContainer side="left|right" />
        <MessageContainer side="left|right" />
        <MessageContainer side="left|right" />
        ...
     </div>
    */
    const container = createElement('div', {
        'class': 'flex-fill overflow-auto'
    }, [
        MessageContainer('left'),
        MessageContainer('right'),
        MessageContainer('left'),
        MessageContainer('left'),
        MessageContainer('right')
    ]);

    parentElement.appendChild(container);
}

const SendMessageBox = () => (parentElement) => {
    /*
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Escribe tu mensaje aquí"
            aria-label="Escribe tu mensaje aquí" aria-describedby="send">
        <button type="button" class="btn btn-success">Enviar</button>
    </div>
    */
    const container = createElement('div', {
        'class': 'input-group mb-3'
    }, [
        createElement('input', {
            'class': 'form-control',
            'type': 'text',
            'placeholder': 'Escribe tu mensaje aquí'
        }),
        createElement('button', {
            'class': 'btn btn-success',
            'type': 'button'
        }, 'Enviar')
    ]);

    parentElement.appendChild(container);
}

const App = (parentElement) => {
    /*
     <div class="w-100 d-flex flex-column p-2">
        <MessagesBox />
        <SendBox />
     </div>
    */
    const container = createElement('div', {
        'class': 'w-100 d-flex flex-column p-2'
    }, [
        MessagesListBox(),
        SendMessageBox(),
    ]);

    parentElement.appendChild(container);
}

App(document.getElementById('root'));