import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { select, takeLatest } from "redux-saga/effects";
import { selectUserCredential } from "~/features/auth/authSlice";
import { db } from "~/firebase/config";

function* handleLogout(): any {
  const user = yield select(selectUserCredential);
  const userInfo = user.user;
  try {
    setDoc(
      doc(db, "users", userInfo.uid as string),
      {
        isLogin: false,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
}

function* handleLogin(): any {
  const user = yield select(selectUserCredential);
  const userInfo = user.user;
  const uid: string = user.user.uid;
  getDocs(collection(db, "chats")).then((data) => {
    if (data.empty) {
      setDoc(doc(db, "chats", uid), {
        uid,
        messages: [],
      });
    } else {
      const { docs } = data;
      const isRepeat = docs.some((item) => item.data().uid === uid);
      if (!isRepeat) {
        setDoc(doc(db, "chats", uid), {
          uid,
          messages: [],
        });
      }
    }
  });

  getDocs(collection(db, "users")).then((data) => {
    if (data.empty) {
      setDoc(
        doc(db, "users", userInfo.uid as string),
        {
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL,
          loginAt: Date.now(),
          uid: userInfo.uid,
          isLogin: true,
        },
        { merge: true }
      );
    } else {
      setDoc(
        doc(db, "users", userInfo.uid as string),
        {
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL,
          loginAt: Date.now(),
          uid: userInfo.uid,
          isLogin: true,
        },
        { merge: true }
      );
    }
  });
}

export function* rootSaga() {
  yield takeLatest("auth/login", handleLogin);
  yield takeLatest("auth/logout", handleLogout);
}
