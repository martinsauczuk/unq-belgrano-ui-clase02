import React, { useEffect, useState } from "react";
import { ModelContext } from './ModelContext';
import { messages, sendMessage, writtenMessage } from "../../Models/Messaging";

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
