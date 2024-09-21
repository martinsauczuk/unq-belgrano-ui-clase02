import React, { useContext } from "react";
import { ModelContext } from "./Contexts";
import { MessagesListBox, SendMessageBox } from "./Components";

export const App = () => {
    const { ctxMessages, ctxSendMessage } = useContext(ModelContext);

    return (
        <div className="w-100 d-flex flex-column p-2">
            <MessagesListBox messages={ctxMessages} />
            <SendMessageBox onMessageSend={ctxSendMessage} />
        </div>
    )
};

