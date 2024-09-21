const { messages, writtenMessage, sendMessage } = window.Model;
const { createElement, createRoot, getRootApp } = window.UILibrary;

const Message = ({ side, message, date, sender }) => {
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
            }, sender),
            createElement('small', {}, getTime(date)),
        ),
        createElement('div', {
            className: 'toast-body ' + bgColor
        }, message)
    );
}

const MessageContainer = ({ side, ...rest }) => {
    const justifyAt = side === 'left' ? 'start' : 'end';

    return createElement('div', {
        className: 'd-flex flex-row m-1 justify-content-' + justifyAt
    },
        createElement(Message, { side, ...rest })
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

const SendMessageBox = () => {
    const handleTextChanged = (ev) => {
        if (ev.keyCode === 13) {
            // Se apretó enter, mandar el mensaje
            sendMessage();
            getRootApp().render();
        } else {
            // Se apretó otra tecla, modificar el contenido.
            writtenMessage.contents = ev.target.value;
            // No necesitamos re-renderizar en este caso,
            // Ya que este cambio ya está en la vista.
        }
    };

    const handleButtonClicked = () => {
        sendMessage();
        getRootApp().render();
    };

    return createElement('div', {
        className: 'input-group mb-3'
    },
        createElement('input', {
            className: 'form-control',
            type: 'text',
            placeholder: 'Escribe tu mensaje aquí',
            onKeyUp: handleTextChanged
        }),
        createElement('button', {
            className: 'btn btn-success',
            type: 'button',
            onClick: handleButtonClicked
        }, 'Enviar')
    );
}

const App = () =>
    createElement('div', {
        className: 'w-100 d-flex flex-column p-2'
    },
        // Ahora MessageListBox espera más información, hay que pasarle un
        // objeto con un atributo messages con los mensajes a mostrar.
        createElement(MessagesListBox, {
            messages: messages
        }),
        createElement(SendMessageBox),
    );

createRoot(document.getElementById('root')).render(
    App
);
