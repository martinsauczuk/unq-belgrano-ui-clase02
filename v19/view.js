const { messages, writtenMessage, sendMessage } = window.Model;
const { createElement, useEffect, useRef, useState, createContext, useContext } = React;
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
            onKeyUp: handleTextChanged
        }),
        createElement('button', {
            className: 'btn btn-success',
            type: 'button',
            onClick: handleButtonClicked
        }, 'Enviar')
    );
}

const App = () => {
    // Ahora nos alcanza con utilizar el contexto
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return createElement('div', {
        className: 'w-100 d-flex flex-column p-2'
    },
        createElement(MessagesListBox, {
            messages: ctxMessages
        }),
        createElement(SendMessageBox, {
            onMessageSend: ctxSendMessage
        }),
    );
};

// El contexto mantendrá sincronizado el modelo y el mundo react
// similar a lo que hacíamos con el observer. De hecho, no nos
// vamos a salvar de usar el observer del modelo.
const ModelContext = createContext({
    ctxMessages: [],
    ctxSendMessage: () => {}
});
const ModelContextProvider = ({ children }) => {
    // Mantenemos un estado para el contexto. Notar como el valor es
    // una copia de la lista de mensajes. Necesitamos copiarlo,
    // para que react pueda darse cuenta que los valores cambiaron
    // y actualizar los componentes de forma apropiada
    const [ctxMessages, setCtxMessages] = useState([...messages]);

    // Y vamos a proveer una función para mandar un mensaje y
    // actualizar el estado del contexto de forma que esté sincronizado
    // con el modelo
    const ctxSendMessage = (msg) => {
        writtenMessage.contents = msg;
        sendMessage();
        setCtxMessages([...messages]);
    }

    // Como el modelo puede cambiar de forma externa, vamos a tener
    // que suscribirnos a su observer. Si cambia algo, cambiamos
    // el estado interno del contexto
    useEffect(() => {
        messages.onChange(() => {
            setCtxMessages([...messages]);
        });
        // Muy divertidamente, este pasa a ser un componente de react.
        // Por algún motivo podría ser que react "desmonte" el componente,
        // y entonces nuestro observador del viejo componente debería
        // eliminarse. useEffect permite devolver una función de "limpieza"
        // que se ejecuta cuando se desmonta el componente. Por eso agregamos
        // clear en este caso.
        return () => messages.clearListeners();
    });

    // Devolvemos el elemento que corresponde al proveedor de context donde los valores
    // se corresponden al estado del contexto.
    return createElement(ModelContext.Provider, {value: { ctxMessages, ctxSendMessage }}, children)
}

createRoot(document.getElementById('root')).render(
    // Nuestra app ahora usa el contexto del modelo
    createElement(ModelContextProvider, null,
        createElement(App)
    )
);
