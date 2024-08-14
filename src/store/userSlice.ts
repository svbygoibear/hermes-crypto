import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/userState";
import { User } from "../types/user";

const initialState: UserState = {
    currentUser: null,
    isLoggedIn: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        clearUser: state => {
            state.currentUser = null;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setLoggedOut: state => {
            state.isLoggedIn = false;
        }
    }
});

export const { setUser, clearUser, setLoggedIn, setLoggedOut } = userSlice.actions;
export default userSlice.reducer;
