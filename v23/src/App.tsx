import React, { useContext } from "react";
import { ModelContext } from "./Contexts/ModelContext/ModelContext";
import { MessagesListBox } from "./Components/MessagesListBox/MessagesListBox";
import { SendMessageBox } from "./Components/SendMessageBox/SendMessageBox";

export const App = () => {
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return (
        <div className="w-100 d-flex flex-column p-2">
            <MessagesListBox messages={ctxMessages} />
            <SendMessageBox onMessageSend={ctxSendMessage} />
        </div>
    )
};

