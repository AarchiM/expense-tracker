import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { transactionApi } from "../store/TransactionApi";

export const store = configureStore({
    reducer: {
        [transactionApi.reducerPath]: transactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(transactionApi.middleware),
})

setupListeners(store.dispatch);