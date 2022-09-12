import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { selectUserCredential } from "~/features/auth/authSlice";
import { db } from "~/firebase/config";
import { ChatUI } from "./components";

interface initialStateTypes {
  id: string;
  selectedUserId: string;
}

function Chat() {
  const userCredential = useSelector(selectUserCredential);
  const currUser = userCredential?.user;
  const currUserId = currUser?.uid;
  const [listRoom, setListRoom] = useState(() => {
    const initialState: initialStateTypes[] = [];
    return initialState;
  });
  useEffect(() => {
    getDocs(collection(db, "rooms")).then((data) => {
      const listRoom: initialStateTypes[] = [];
      const { docs } = data;
      docs.forEach((doc) => {
        const roomId = doc.id;
        const { users } = doc.data();
        const selectedUserId = users.find((userId: any) => userId !== currUserId);
        listRoom.push({ id: roomId, selectedUserId });
      });
      setListRoom(listRoom);
    });
  }, [currUserId]);
  return (
    <Routes>
      {listRoom.map((room) => {
        return <Route path={room.id} element={<ChatUI id={room.selectedUserId} />} key={room.id} />;
      })}
    </Routes>
  );
}

export default Chat;
