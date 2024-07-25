import { configureStore } from "@reduxjs/toolkit";
import parameterSlice from "./features/parameter/parameterSlice";

export const store = configureStore({
    reducer: {
        parameters: parameterSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
