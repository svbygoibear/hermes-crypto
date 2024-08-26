import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types/appState";

const initialState: AppState = {
    theme: ""
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        }
    }
});

export const { setTheme } = appSlice.actions;
export default appSlice.reducer;
