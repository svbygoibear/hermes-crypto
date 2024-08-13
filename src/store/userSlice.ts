import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/userState";

const initialState: UserState = {
    currentUser: null,
    isLoggedIn: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.currentUser = action.payload.currentUser;
        },
        clearUser: state => {
            state.currentUser = null;
        },
        setLoggedIn: (state, action: PayloadAction<UserState>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setLoggedOut: state => {
            state.isLoggedIn = false;
        }
    }
});

export const { setUser, clearUser, setLoggedIn, setLoggedOut } = userSlice.actions;
export default userSlice.reducer;
