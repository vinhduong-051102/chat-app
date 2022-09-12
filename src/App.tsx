import { collection, onSnapshot } from "firebase/firestore";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Protected } from "~/components";
import { logout, selectIsLogin } from "~/features/auth/authSlice";
import { db } from "~/firebase/config";
import { MainLayout } from "~/layouts";
import { privateRoute, publicRoute } from "~/routes";
import { setListUser } from "./app/rootReducer";
import { getMessages, getRooms } from "./features/chat/chatSlice";
interface userTypes {
  displayName: string;
  isLogin: boolean;
  loginAt: number;
  photoURL: string;
  uid: string;
}

interface messageTypes {
  uid: string;
  content: string;
  roomID: string;
  createdAt: number;
}

interface roomType {
  roomID: string;
  users: string[];
}

function App() {
  const dispatch = useDispatch();
  const _isLogin = useSelector(selectIsLogin);
  useEffect(() => {
    if (_isLogin) {
      onSnapshot(collection(db, "users"), (data) => {
        const { docs } = data;
        const listUser: userTypes[] = [];
        docs.forEach((doc) => {
          const { isLogin, loginAt, photoURL, displayName, uid } = doc.data();
          listUser.push({ isLogin, loginAt, photoURL, displayName, uid });
        });
        dispatch(setListUser(listUser));
      });

      onSnapshot(collection(db, "messages"), (data) => {
        const { docs } = data;
        const messages: messageTypes[] = [];
        docs.forEach((doc) => {
          const { createdAt, content, roomID, uid } = doc.data();
          messages.push({ createdAt, content, roomID, uid });
        });
        dispatch(getMessages(messages));
      });

      onSnapshot(collection(db, "rooms"), (data) => {
        const { docs } = data;
        const rooms: roomType[] = [];
        docs.forEach((doc) => {
          const { users } = doc.data();
          rooms.push({ users, roomID: doc.id });
        });
        dispatch(getRooms(rooms));
      });
    }
  }, [_isLogin, dispatch]);
  useEffect(() => {
    const handleBeforeUpload = () => {
      dispatch(logout());
    };
    window.addEventListener("unload", handleBeforeUpload);
    window.addEventListener("beforeunload", handleBeforeUpload);
  }, [dispatch]);

  return (
    <div className='App'>
      <Routes>
        {publicRoute.map((route, index) => {
          const path = route.path;
          let Layout = MainLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              path={path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        <Route element={<Protected />}>
          {privateRoute.map((route, index) => {
            const { path } = route;
            let Layout = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                path={path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
