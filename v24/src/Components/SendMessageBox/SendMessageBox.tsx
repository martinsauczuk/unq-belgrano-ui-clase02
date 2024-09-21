import React, { useRef, useState } from "react";

export const SendMessageBox: React.FC<{ onMessageSend: (text: string) => void }> = ({ onMessageSend }) => {

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
