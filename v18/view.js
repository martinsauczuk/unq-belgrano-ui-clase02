const { messages, writtenMessage, sendMessage } = window.Model;
const { createElement, useEffect, useRef, useState, useReducer } = React;
const { createRoot } = ReactDOM;

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

const MessagesListBox = ({ messages }) => {
    const containerRef = useRef();

    useEffect(() => {
        containerRef.current.scroll(0, containerRef.current.scrollHeight);
    });

    return createElement('div', {
        ref: containerRef,
        className: 'flex-fill overflow-auto'
    }, ...messages.map((m, i) =>
            createElement(MessageContainer, {
                key: i,
                side: m.sender === 'Alice' ? 'left' : 'right',
                sender: m.sender,
                date: m.date,
                message: m.message,
            })
        )
    );
}

const SendMessageBox = ({ onMessageSend }) => {
    const [ text, setText ] = useState('');

    const inputRef = useRef();

    const handleActionForSending = () => {
        setText('');
        onMessageSend(inputRef.current.value);
    }

    const handleChange = () => {
        setText(inputRef.current.value);
    };

    const handleTextChanged = (ev) => {
        if (ev.keyCode === 13) {
            // Se apretó enter, mandar el mensaje
            handleActionForSending();
        }
    };

    const handleButtonClicked = () => {
        handleActionForSending();
    };

    return createElement('div', {
        className: 'input-group mb-3'
    },
        createElement('input', {
            ref: inputRef,
            className: 'form-control',
            type: 'text',
            placeholder: 'Escribe tu mensaje aquí',
            value: text,
            onChange: handleChange,
            onKeyUp: handleTextChanged,
        }),
        createElement('button', {
            className: 'btn btn-success',
            type: 'button',
            onClick: handleButtonClicked
        }, 'Enviar')
    );
}

const App = () => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        messages.onChange(() => {
            forceUpdate();
        });
        return () => messages.clearListeners();
    });

    return createElement('div', {
        className: 'w-100 d-flex flex-column p-2'
    },
        createElement(MessagesListBox, {
            messages: messages
        }),
        createElement(SendMessageBox, {
            onMessageSend: (msg) => {
                writtenMessage.contents = msg;
                sendMessage();
            }
        }),
    );
};

createRoot(document.getElementById('root')).render(
    createElement(App)
);
