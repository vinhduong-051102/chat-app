import { configureStore } from "@reduxjs/toolkit";
import authReducer from "~/features/auth/authSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";
import chatReducer from "~/features/chat/chatSlice";


const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    authReducer,
    chatReducer,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return middleware;
  },
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
