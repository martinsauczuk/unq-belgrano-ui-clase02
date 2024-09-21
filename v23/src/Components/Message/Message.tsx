import React from 'react';
import { Message as MessageType } from '../../Models/Message';

type MessageWithSide = MessageType & { side: 'left' | 'right' };

export const Message: React.FC<MessageWithSide> = ({ side, message, date, sender }) => {
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