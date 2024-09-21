import { Message } from '../Models/Message';
import { randomIntBetween } from '../Utilities/randomIntBetween';

const remoteName = 'Bob';

export const sendMessageToServer = (msgToSend: Message): void => {}

export const receiveMessageFromServer = (): Message => {
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
