import { receiveMessage } from '../Models/Messaging';
import { randomIntBetween } from '../Utilities/randomIntBetween';

export const triggerMessageReception = (): void => {
    const seconds = randomIntBetween(5, 15);
    setTimeout(() => {
        receiveMessage();
        triggerMessageReception();
    }, seconds * 1000);
}
