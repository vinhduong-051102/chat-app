import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/app/store";



interface message {
  uid: string;
  content: string;
  roomID: string;
  createdAt: number;
}

interface room {
  roomID: string;
  users: string[]
}

interface initialStateTypes {
  messages: message[];
  rooms: room[];
}

const initialState: initialStateTypes = {
  messages: [],
  rooms: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      
      state.messages = [...action.payload];
    },
    getRooms: (state, action) => {
      state.rooms = [...action.payload]
    }
  },
});

export const selectMessages = (state: RootState) => state.chatReducer.messages;
export const selectRooms = (state: RootState) => state.chatReducer.rooms;
export const { getMessages, getRooms } = chatSlice.actions;
export default chatSlice.reducer;
