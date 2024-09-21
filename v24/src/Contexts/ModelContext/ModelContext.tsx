import React, { createContext } from "react";
import { ModelContextValues } from "./ModelContextValues";

export const ModelContext: React.Context<ModelContextValues> = createContext<ModelContextValues>({
    ctxMessages: [],
    ctxSendMessage: () => {}
});