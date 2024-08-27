import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Import reducers here
import userReducer from "./userSlice";
import appReducer from "./appSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "app"] // reducers to persist to domain specific storage
};

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer
    // Add other reducers here if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
