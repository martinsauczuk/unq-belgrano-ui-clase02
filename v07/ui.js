const { createElement, createRoot } = window.UILibrary;

const Message = ({ side, message, date, sender }) => {
    // Ahora las props se reciben mediante asignación desestructurada
    const getTime = (date) => {
        const formatter = new Intl.DateTimeFormat('es-ES', {
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
        const parts = formatter.formatToParts(date);
        const valueParts = parts.map((e) => e.value);
        return valueParts.join('');
    }

    const bgColor = side === 'left' ? 'text-bg-success' : '';

    return createElement('div', {
        className: 'toast show m-1',
        role: 'alert'
    },
        createElement('div', {
            className: 'toast-header ' + bgColor
        },
            createElement('strong', {
                className: 'me-auto'
            }, sender), // Notar como ahora la uso como parámetro
            createElement('small', {}, getTime(date)), // Y el date
        ),
        createElement('div', {
            className: 'toast-body ' + bgColor
        }, message) // Y el message
    );
}

const MessageContainer = ({ side, ...rest }) => {
    // Acá hay asignación desestrcutrada con el operador de resto
    const justifyAt = side === 'left' ? 'start' : 'end'; // Usamos solo una de las props

    return createElement('div', {
        className: 'd-flex flex-row m-1 justify-content-' + justifyAt
    },
        createElement(Message, { side, ...rest }) // Y rearmamos el objeto al invocar
    );
}

const MessagesListBox = ({ messages }) =>
    createElement('div', {
        className: 'flex-fill overflow-auto'
    }, ...messages.map((m) =>
            createElement(MessageContainer, {
                side: m.sender === 'Alice' ? 'left' : 'right',
                sender: m.sender,
                date: m.date,
                message: m.message,
            })
        )
    );

const SendMessageBox = () =>
    createElement('div', {
        className: 'input-group mb-3'
    },
        createElement('input', {
            className: 'form-control',
            type: 'text',
            placeholder: 'Escribe tu mensaje aquí'
        }),
        createElement('button', {
            className: 'btn btn-success',
            type: 'button'
        }, 'Enviar')
    );

const App = () =>
    createElement('div', {
        className: 'w-100 d-flex flex-column p-2'
    },
        // Ahora MessageListBox espera más información, hay que pasarle un
        // objeto con un atributo messages con los mensajes a mostrar.
        createElement(MessagesListBox, {
            messages: [
                { sender: 'Alice', date: new Date(), message: 'Hola, bob'},
                { sender: 'Bob', date: new Date(), message: 'Hola, Alice. Qué tal?'},
                { sender: 'Alice', date: new Date(), message: 'Muy bien.'},
                { sender: 'Alice', date: new Date(), message: 'Te escribía para saber si ya tienes el reporte.'},
                { sender: 'Bob', date: new Date(), message: 'Aún no, estoy trabajando en ello.'}
            ]
        }),
        createElement(SendMessageBox),
    );

createRoot(document.getElementById('root')).render(
    App
);
