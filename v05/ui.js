const { createElement, createRoot } = window.UILibrary;

const Message = (props) => {
    // Esta función formatea una fecha, transformandola en un
    // string con la forma hora:minutos:segundos.
    // Es útil para formatear la fecha que nos llega en las props.
    const getTime = (date) => {
        const formatter = new Intl.DateTimeFormat('es-ES', {
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
        const parts = formatter.formatToParts(date);
        const valueParts = parts.map((e) => e.value);
        return valueParts.join('');
    }

    const bgColor = props.side === 'left' ? 'text-bg-success' : '';

    return createElement('div', {
        'class': 'toast show m-1',
        'role': 'alert'
    }, [
        createElement('div', {
            'class': 'toast-header ' + bgColor
        }, [
            createElement('strong', {
                'class': 'me-auto'
            }, props.sender), // Notar como ahora el sender viene de las props.
            createElement('small', {}, getTime(props.date)), // Y el date
        ]),
        createElement('div', {
            'class': 'toast-body ' + bgColor
        }, props.message) // Y el message
    ]);
}

const MessageContainer = (props) => {
    const justifyAt = props.side === 'left' ? 'start' : 'end'; // Usamos solo una de las props

    return createElement('div', {
        'class': 'd-flex flex-row m-1 justify-content-' + justifyAt
    }, [
        Message(props) // Pasamos la totalidad de las props como argumento al siguiente componente
    ]);
}

const MessagesListBox = (props) =>
    createElement('div', {
        'class': 'flex-fill overflow-auto'
    },
    // No hace falta que recorramos la lista de mensajes nosotros, basta con
    // utilizar funciones de alto orden, como map, para transformar la lista de mensajes
    // en una lista de componentes MessageContainer
        props.messages.map((m) => MessageContainer({
            side: m.sender === 'Alice' ? 'left' : 'right',
            sender: m.sender,
            date: m.date,
            message: m.message,
        })
    ));

const SendMessageBox = () =>
    createElement('div', {
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

const App = () =>
    createElement('div', {
        'class': 'w-100 d-flex flex-column p-2'
    }, [
        // Ahora MessageListBox espera más información, hay que pasarle un
        // objeto con un atributo messages con los mensajes a mostrar.
        MessagesListBox({
            messages: [
                { sender: 'Alice', date: new Date(), message: 'Hola, bob'},
                { sender: 'Bob', date: new Date(), message: 'Hola, Alice. Qué tal?'},
                { sender: 'Alice', date: new Date(), message: 'Muy bien.'},
                { sender: 'Alice', date: new Date(), message: 'Te escribía para saber si ya tienes el reporte.'},
                { sender: 'Bob', date: new Date(), message: 'Aún no, estoy trabajando en ello.'}
            ]
        }),
        SendMessageBox(),
    ]);

createRoot(document.getElementById('root')).render(
    App
);
