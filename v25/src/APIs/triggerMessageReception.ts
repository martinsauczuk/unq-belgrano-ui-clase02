import { receiveMessage } from '../Models';
import { randomIntBetween } from '../Utilities';

export const triggerMessageReception = (): void => {
    const seconds = randomIntBetween(5, 15);
    setTimeout(() => {
        receiveMessage();
        triggerMessageReception();
    }, seconds * 1000);
}
