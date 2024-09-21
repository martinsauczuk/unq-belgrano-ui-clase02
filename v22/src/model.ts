import { Observer } from './observer_library';

/****************** Utilidades ***********************/
const randomIntBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export type Message = {
    sender: string,
    date: Date,
    message: string
};

/****************** Main Contents ***********************/
const localName = 'Alice';
const remoteName = 'Bob';

const messagesChangedObserver = new Observer();

export type MessageList = Message[] & {
    onChange: (f: () => void) => void,
    clearListeners: () => void
};

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
        // Acá hay que notificar que el modelo cambió:
        messagesChangedObserver.triggerEvent();
    }
}

const receiveMessage = () => {
    const msgReceived = receiveMessageFromServer();
    messages.push(msgReceived);
    // Acá hay que notificar que el modelo cambió:
    messagesChangedObserver.triggerEvent();
}

/****************** Server simulation ***********************/
const sendMessageToServer = (msgToSend: Message): void => {}

const receiveMessageFromServer = (): Message => {
    const msgs = [
        'Hola', 'LOL',
        '¿Cómo estás?', '¿Qué sucede?', '¿Puedo ayudarte?',
        'Claro, ya estoy en eso', 'Enseguida', 'No hay problema',
        'Sería interesante lograrlo', 'Vamos a hacerlo',
        'No molestes', 'No estarías siendo útil',
        'No pienso hacerlo', 'No quiero',
    ];
    const randIndex = randomIntBetween(0, msgs.length - 1);
    const msg = msgs[randIndex];

    return {
        sender: remoteName,
        date: new Date(),
        message: msg
    };
}

const triggerMessageReception = (): void => {
    const seconds = randomIntBetween(5, 15);
    setTimeout(() => {
        receiveMessage();
        triggerMessageReception();
    }, seconds * 1000);
}

triggerMessageReception();
