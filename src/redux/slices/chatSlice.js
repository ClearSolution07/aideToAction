import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChat: null,
    messages: [], // Stores all chat messages
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveChat(state, action) {
            state.activeChat = action.payload;
        },
        setMessages(state, action) {
            state.messages = action.payload; // Overwrite messages
        },
        addMessage(state, action) {
            state.messages.push(action.payload); // Add a new message
        },
    },
});

export const { setActiveChat, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
