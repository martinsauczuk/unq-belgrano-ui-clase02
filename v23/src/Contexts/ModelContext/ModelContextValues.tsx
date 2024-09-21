import { Message } from "../../Models/Message";

export type ModelContextValues = {
    ctxMessages: Message[],
    ctxSendMessage: (msg: string) => void
};