import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChat: null,
    messages: [],
    chatList: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveChat: (state, action) => {
            state.activeChat = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setChatList: (state, action) => {
            state.chatList = action.payload;
        },
        clearChat: (state) => {
            state.activeChat = null;
            state.messages = [];
        },
    },
});

export const {
    setActiveChat,
    addMessage,
    setMessages,
    setChatList,
    clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;
