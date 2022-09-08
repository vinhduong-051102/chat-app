import { Routes, Route } from "react-router-dom";
import { selectListUser } from "~/app/rootReducer";
import { selectUserCredential } from "~/features/auth/authSlice";
import { useSelector } from "react-redux";
import { ChatUI } from "./components";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "~/firebase/config";

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
        console.log(room.id);
        return <Route path={room.id} element={<ChatUI id={room.selectedUserId} />} key={room.id} />;
      })}
    </Routes>
  );
}

export default Chat;
