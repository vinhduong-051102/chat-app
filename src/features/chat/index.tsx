import { Routes, Route } from "react-router-dom";
import { selectListUser } from "~/app/rootReducer";
import { useSelector } from "react-redux";
import { ChatUI } from "./components";

function Chat() {
  const listUser = useSelector(selectListUser);
  return (
    <Routes>
      {listUser.map((user) => {
        return <Route path={user.uid} element={<ChatUI id={user.uid} />} key={user.uid} />;
      })}
    </Routes>
  );
}

export default Chat;
