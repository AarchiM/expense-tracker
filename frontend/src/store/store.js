import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { transactionApi } from "./transactionApi.js";
import modeReducer from "./darkmodeSlice.js"

export const store = configureStore({
    reducer: {
        [transactionApi.reducerPath]: transactionApi.reducer,
        mode: modeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(transactionApi.middleware),
})

setupListeners(store.dispatch);