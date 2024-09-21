const { messages, writtenMessage, sendMessage } = window.Model;
const { createElement, createRoot, getRootApp, useEffect, useRef, useState } = window.UILibrary;

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
    }, ...messages.map((m) =>
            createElement(MessageContainer, {
                side: m.sender === 'Alice' ? 'left' : 'right',
                sender: m.sender,
                date: m.date,
                message: m.message,
            })
        )
    );
}

const SendMessageBox = ({ onMessageSend }) => {

    const [ lastSelectionStart, setLastSelectionStart ] = useState(0);
    const [ lastSelectionEnd, setLastSelectionEnd ] = useState(0);
    const [ text, setText ] = useState('');

    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
        inputRef.current.selectionStart = lastSelectionStart;
        inputRef.current.selectionEnd = lastSelectionEnd;
    });

    const handleTextSelectionChanged = () => {
        setLastSelectionStart(inputRef.current.selectionStart);
        setLastSelectionEnd(inputRef.current.selectionEnd);
    };

    const handleActionForSending = () => {
        setText('');
        onMessageSend(inputRef.current.value);
    }

    const handleTextChanged = (ev) => {
        if (ev.keyCode === 13) {
            // Se apretó enter, mandar el mensaje
            handleActionForSending();
        } else {
            // Se apretó otra tecla, modificar el contenido.
            setText(inputRef.current.value);
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
            onKeyUp: handleTextChanged,
            onSelectionChange: handleTextSelectionChanged
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
        createElement(MessagesListBox, {
            messages: messages
        }),
        createElement(SendMessageBox, {
            onMessageSend: (text, setText) => {
                writtenMessage.contents = text;
                sendMessage();
            }
        }),
    );

createRoot(document.getElementById('root')).render(
    App
);

messages.onChange(() => getRootApp().render());