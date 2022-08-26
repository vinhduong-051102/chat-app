import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface userTypes {
  displayName: string;
  isLogin: boolean;
  loginAt: number;
  photoURL: string;
  uid: string;
}

interface actionTypes {
  type: string;
  payload: userTypes[];
}

const initialState: { listUser: userTypes[] | [] } = {
  listUser: [],
};

const rootSlice = createSlice({ 
  name: "root",
  initialState,
  reducers: {
    setListUser: (state, action: actionTypes) => {
      state.listUser = [...action.payload];
    },
  },
});

export default rootSlice.reducer;
export const { setListUser } = rootSlice.actions;
export const selectListUser = (state: RootState) => state.rootReducer.listUser;
export const selectListUserOnline = (state: RootState) => {
  const listUserOnline = state.rootReducer.listUser.filter(user => user?.isLogin === true)
  return listUserOnline
}
