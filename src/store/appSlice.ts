import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../types/appState";

const initialState: AppState = {
    theme: "",
    instructionsCollapsed: false
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
        },
        toggleInstructions: state => {
            state.instructionsCollapsed = !state.instructionsCollapsed;
        }
    }
});

export const { setTheme, toggleInstructions } = appSlice.actions;
export default appSlice.reducer;
