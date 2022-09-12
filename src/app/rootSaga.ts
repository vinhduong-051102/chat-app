import { collection, doc, DocumentData, getDocs, QuerySnapshot, setDoc, query } from "firebase/firestore";
import { select, takeLatest, call, put } from "redux-saga/effects";
import { selectUserCredential } from "~/features/auth/authSlice";
import { auth, db } from "~/firebase/config";
import { getMessages, getRooms } from "~/features/chat/chatSlice";



interface message {
  uid: string;
  content: string;
  createdAt: string;
  roomID: string;
}

interface room {
  roomID: String;
  users: String[]
}

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
  auth.signOut()
}

function fetchMessages() {
  return getDocs(collection(db, "messages"))
}

function fetchRooms() {
  return getDocs(collection(db, "rooms"))
}

function* handleLogin(): any {
  const user = yield select(selectUserCredential);
  const userInfo = user.user;
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
  // get messages
  const data: QuerySnapshot<DocumentData> = yield call(fetchMessages)
  const messagesDocs = data.docs
  const messages: message[] = []
  messagesDocs.forEach(doc => {
    const { uid, content, roomID, createdAt } = doc.data()
    messages.push({ uid, content, roomID, createdAt })
  })
  yield put(getMessages(messages))

  // get rooms
  const roomsData: QuerySnapshot<DocumentData> = yield call(fetchRooms)
  const roomsDocs = roomsData.docs
  
  const rooms: room[] = []
  roomsDocs.forEach(doc => {
    const { users } = doc.data()
    rooms.push({ roomID: doc.id, users })
  })
  yield put(getRooms(rooms))
}

export function* rootSaga() {
  yield takeLatest("auth/login", handleLogin);
  yield takeLatest("auth/logout", handleLogout);
}
