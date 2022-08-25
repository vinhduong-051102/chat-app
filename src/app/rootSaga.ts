import { doc, getDoc, setDoc } from "firebase/firestore";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { logout, selectUserCredential } from "~/features/auth/authSlice";
import { pushUser } from "./rootReducer";
import { db } from "~/firebase/config";

async function fetchUser(uid: string) {
  return await getDoc(doc(db, "users", uid)).then((user) => user.data());
}

function* push(listUId: string[]): any {
  const length = listUId.length
  for (let i = 0; i < length; i++) {
    const user = yield call(fetchUser, listUId[i]);
    yield put(pushUser(user))
  }
}

function* handleLogout(): any {
  const user = yield select(selectUserCredential);
  try {
    setDoc(
      doc(db, "users", user.uid as string),
      {
        isLogin: false,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
  put(logout());
}

async function getListUid() {
  const idListUId = "iMibofOynWmdQCKVJY0U";
  const docRef = doc(db, "users", idListUId);
  return await getDoc(docRef).then((doc) => doc.data());
}

function* handleLogin(): any {
  const idListUId = "iMibofOynWmdQCKVJY0U";
  const user = yield select(selectUserCredential);
  const data = yield call(getListUid);
  const listUId = data.listUId;
  const oldData: string[] = listUId;
  const uid: string = user.uid;
  if (!oldData.includes(uid)) {
    const newData: string[] = [...oldData, user.uid];
    yield call(push, newData);
    setDoc(
      doc(db, "chats", uid),
      {
        hostId: uid,
        message: [],
      },
      { merge: true }
    );
    setDoc(
      doc(db, "users", idListUId),
      {
        listUId: newData,
      },
      { merge: true }
    );
  } else {
    const newData: string[] = [...oldData];
    yield call(push, newData);
  }
  
}

export function* rootSaga() {
  yield takeLatest("auth/login", handleLogin);
  yield takeLatest("auth/logout", handleLogout);
}
