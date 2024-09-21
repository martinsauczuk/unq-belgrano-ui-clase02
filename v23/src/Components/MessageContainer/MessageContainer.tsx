import React from 'react';
import { Message as MessageType } from '../../Models/Message';
import { Message } from '../Message/Message';

type MessageWithSide = MessageType & { side: 'left' | 'right' };

export const MessageContainer: React.FC<MessageWithSide> = ({ side, ...rest }) => {
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