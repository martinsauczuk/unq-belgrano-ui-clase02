const { messages, writtenMessage, sendMessage } = window.Model;
const { useEffect, useRef, useState, createContext, useContext } = React;
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

    return (
        <div
            className="toast show m-1"
            role="alert">
            <div className={'toast-header ' + bgColor}>
                <strong className='me-auto'>
                    {sender}
                </strong>
                <small>{getTime(date)}</small>
            </div>
            <div className={'toast-body ' + bgColor}>
                {message}
            </div>
        </div>
    )
}

const MessageContainer = ({ side, ...rest }) => {
    const justifyAt = side === 'left' ? 'start' : 'end';

    return (
        <div className={'d-flex flex-row m-1 justify-content-' + justifyAt}>
            <Message
                side={side}
                {...rest}
            />
        </div>
    )
}

const MessagesListBox = ({ messages }) => {
    const containerRef = useRef();

    useEffect(() => {
        containerRef.current.scroll(0, containerRef.current.scrollHeight);
    });

    return (
        <div
            ref={containerRef}
            className="flex-fill overflow-auto">
            {messages.map((m, i) =>
                <MessageContainer
                    key={i}
                    side={m.sender === 'Alice' ? 'left' : 'right'}
                    sender={m.sender}
                    date={m.date}
                    message={m.message}
                />
            )}
        </div>
    )
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
            handleActionForSending();
        }
    };

    const handleButtonClicked = () => {
        handleActionForSending();
    };

    return (
        <div className="input-group mb-3">
            <input
                ref={inputRef}
                className="form-control"
                type="text"
                placeholder="Escribe tu mensaje aquí"
                value={text}
                onChange={handleChange}
                onKeyUp={handleTextChanged}
            />
            <button
                className="btn btn-success"
                type="button"
                onClick={handleButtonClicked}
            >
                    Enviar
            </button>
        </div>
    )
}

const App = () => {
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return (
        <div className="w-100 d-flex flex-column p-2">
            <MessagesListBox messages={ctxMessages} />
            <SendMessageBox onMessageSend={ctxSendMessage} />
        </div>
    )
};

const ModelContext = createContext({
    ctxMessages: [],
    ctxSendMessage: () => {}
});
const ModelContextProvider = ({ children }) => {
    const [ctxMessages, setCtxMessages] = useState([...messages]);

    const ctxSendMessage = (msg) => {
        writtenMessage.contents = msg;
        sendMessage();
        setCtxMessages([...messages]);
    }
    useEffect(() => {
        messages.onChange(() => {
            setCtxMessages([...messages]);
        });
        return () => messages.clearListeners();
    });
    return (
        <ModelContext.Provider value={{ ctxMessages, ctxSendMessage}}>
            {children}
        </ModelContext.Provider>
    )
}

createRoot(document.getElementById('root')).render(
    <ModelContextProvider>
        <App/>
    </ModelContextProvider>
);
