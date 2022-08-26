import { RootState } from '~/app/store';
import { createSlice } from "@reduxjs/toolkit";
import { UserCredential } from 'firebase/auth'


interface initialStateTypes {
  UserCredential: UserCredential | undefined;
  isLogin: boolean;
}

const initialState: initialStateTypes = {
  UserCredential: undefined,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.UserCredential = {...action.payload}
    },
    logout: (state) => {
      state.isLogin = false;
      // state.UserCredential = {}
    }
  },
});

export default authSlice.reducer;
export const selectUserCredential = (state: RootState) => state.LoginReducer.UserCredential;
export const selectIsLogin = (state: RootState) => state.LoginReducer.isLogin

export const { login, logout } = authSlice.actions;
