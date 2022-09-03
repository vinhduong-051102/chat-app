import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";



interface message {
  uid: string;
  content: string;
  roomID: string;
  createdAt: number;
}

interface initialStateStyles {
  messages: message[] | [];
}

const initialState: initialStateStyles = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.messages = [...action.payload];
    },
  },
});

export const selectMessages = (state: RootState) => state.chatReducer.messages;
export const { getMessages } = chatSlice.actions;
export default chatSlice.reducer;
