import React, { useEffect, useRef } from "react";
import { Message } from "../../Models";
import { MessageContainer } from "../MessageContainer/MessageContainer";

export const MessagesListBox: React.FC<{ messages: Message[] }> = ({ messages }) => {
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