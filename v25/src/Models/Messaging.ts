import { receiveMessageFromServer, sendMessageToServer } from '../APIs';
import { Observer } from '../Utilities';
import { MessageList } from './MessageList';

const localName = 'Alice';

const messagesChangedObserver = new Observer();

export const messages: MessageList = [
    { sender: 'Alice', date: new Date(), message: 'Hola, bob'},
    { sender: 'Bob', date: new Date(), message: 'Hola, Alice. Qué tal?'},
    { sender: 'Alice', date: new Date(), message: 'Muy bien.'},
    { sender: 'Alice', date: new Date(), message: 'Te escribía para saber si ya tienes el reporte.'},
    { sender: 'Bob', date: new Date(), message: 'Aún no, estoy trabajando en ello.'}
] as MessageList;
messages.onChange = (f: () => void) => messagesChangedObserver.addObserver(f);
messages.clearListeners = () => messagesChangedObserver.clear();

export const writtenMessage = {
    contents: ''
};

export const sendMessage = (): void => {
    if (writtenMessage.contents) {
        const msgToSend = {
            sender: localName,
            date: new Date(),
            message: writtenMessage.contents
        }
        sendMessageToServer(msgToSend);
        messages.push(msgToSend);
        writtenMessage.contents = '';
        messagesChangedObserver.triggerEvent();
    }
}

export const receiveMessage = () => {
    const msgReceived = receiveMessageFromServer();
    messages.push(msgReceived);
    messagesChangedObserver.triggerEvent();
}
