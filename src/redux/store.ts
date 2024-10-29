import { themeSlice } from "./slices/themeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { hackerNewsApi } from "@/redux/services/stories";


const reducers = {
    theme: themeSlice.reducer,
    [hackerNewsApi.reducerPath]: hackerNewsApi.reducer,
};

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(hackerNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
