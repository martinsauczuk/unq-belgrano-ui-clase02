import { Message } from './Message';

export type MessageList = Message[] & {
    onChange: (f: () => void) => void,
    clearListeners: () => void
};
