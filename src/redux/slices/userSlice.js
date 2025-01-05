import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userInfo: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
            state.token = null;
        },
        updateUserInfo: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
        },
    },
});

export const { setUser, logout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
