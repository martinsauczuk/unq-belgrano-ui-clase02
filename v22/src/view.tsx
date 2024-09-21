import {
    type Message,
    messages,
    writtenMessage,
    sendMessage
} from './model';
import React, {
    useEffect,
    useRef,
    useState,
    createContext,
    useContext
} from 'react';

type MessageWithSide = Message & { side: 'left' | 'right' };

const Message: React.FC<MessageWithSide> = ({ side, message, date, sender }) => {
    const getTime = (date: Date) => {
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

const MessageContainer: React.FC<MessageWithSide> = ({ side, ...rest }) => {
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

const MessagesListBox: React.FC<{ messages: Message[] }> = ({ messages }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current!.scroll(0, containerRef.current!.scrollHeight);
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

const SendMessageBox: React.FC<{ onMessageSend: (text: string) => void }> = ({ onMessageSend }) => {

    const [ text, setText ] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleActionForSending = () => {
        setText('');
        onMessageSend(inputRef.current!.value);
    }

    const handleChange = () => {
        setText(inputRef.current!.value);
    };

    const handleTextChanged = (ev: React.KeyboardEvent<HTMLInputElement>) => {
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
                onKeyUp={(e) => handleTextChanged(e)}
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

export const App = () => {
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return (
        <div className="w-100 d-flex flex-column p-2">
            <MessagesListBox messages={ctxMessages} />
            <SendMessageBox onMessageSend={ctxSendMessage} />
        </div>
    )
};

type ModelContextValues = {
    ctxMessages: Message[],
    ctxSendMessage: (msg: string) => void
};
const ModelContext: React.Context<ModelContextValues> = createContext<ModelContextValues>({
    ctxMessages: [],
    ctxSendMessage: () => {}
});
export const ModelContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [ctxMessages, setCtxMessages] = useState([...messages]);

    const ctxSendMessage = (msg: string) => {
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
