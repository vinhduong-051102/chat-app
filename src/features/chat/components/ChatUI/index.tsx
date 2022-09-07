import { Col, Row } from "antd";
import { ChatRoom, Header, Footer } from "../../components";
import { useState, useEffect, useCallback } from "react";
import { selectListUser } from "~/app/rootReducer";
import { useSelector } from "react-redux";
import { setDoc, doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "~/firebase/config";
import { selectUserCredential } from "~/features/auth/authSlice";
import { selectMessages } from "~/features/chat/chatSlice";
import { v4 } from "uuid";

interface propsTypes {
  id: string;
}

interface message {
  createdAt: number;
  content: string;
  uid: string;
  roomID: string;
}

const ChatUI: React.FC<propsTypes> = ({ id }) => {
  const listUser = useSelector(selectListUser);
  const listMessage = useSelector(selectMessages);
  const [roomID, setRoomID] = useState("");
  const userCredential = useSelector(selectUserCredential);
  const [chatValue, setChatValue] = useState("");
  const [messages, setMessages] = useState(() => {
    const initialState: message[] = [...listMessage]
    return initialState;
  });

  const [currUserId, setCurrUserId] = useState("");
  const currUser = userCredential?.user;
  const userSelected = listUser.find((user) => user.uid === id);
  let hostName = "";
  let photoURL = "";
  let userSelectedId = "";
  if (userSelected?.photoURL && userSelected?.displayName) {
    photoURL = userSelected?.photoURL;
    hostName = userSelected?.displayName;
    userSelectedId = userSelected.uid;
  }
  useEffect(() => {
    if (currUser) {
      setCurrUserId(currUser.uid);
    }
  }, [currUser]);
  useEffect(() => {
    getDocs(collection(db, "rooms")).then((data) => {
      const docs = data.docs;
      const room = docs.find((doc) => {
        const { users } = doc.data();
        const data: string[] = users;
        return data.includes(currUserId) && data.includes(userSelectedId);
      });
      if (room && room?.id) {
        const roomID = room?.id;
        setRoomID(roomID);
      } else {
        if (currUserId !== "") {
          setDoc(doc(db, "rooms", v4()), {
            users: [currUserId, userSelectedId],
          }).then(() => {
            getDocs(collection(db, "rooms")).then((data) => {
              const docs = data.docs;
              const room = docs.find((doc) => {
                const { users } = doc.data();
                const data: string[] = users;
                return data.includes(currUserId) && data.includes(userSelectedId);
              });
              if (room?.id) {
                const roomID = room?.id;
                setRoomID(roomID);
              }
            });
          });
        }
      }
    });
    getDocs(query(collection(db, "messages"), where("roomID", "==", roomID))).then((data) => {
      const docs = data.docs;
      const messages: message[] = [];
      docs.forEach((doc) => {
        const { content, roomID, uid, createdAt } = doc.data();
        messages.push({ content, uid, roomID, createdAt });
      });
    });

    window.scrollTo({top: 100})

  }, [currUserId, userSelectedId, roomID]);
  const handleInputChat: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setChatValue(e.target.value);
  };

  const handleSubmit = useCallback(() => {
    setDoc(doc(db, "messages", v4()), {
      content: chatValue,
      roomID: roomID,
      uid: currUserId,
      createdAt: Date.now(),
    }).then(() => {
      setChatValue("");
    });
  }, [chatValue, currUserId, roomID]);

  const handleLike = () => {
    setDoc(doc(db, "messages", v4()), {
      content: "&#128077;",
      roomID: roomID,
      uid: currUserId,
      createdAt: Date.now(),
    }).then(() => {
      setChatValue("");
    });
  }

  useEffect(() => {
    const handleTypeEnter = (which: KeyboardEvent) => {
      if (which.key === "Enter") {
        if(chatValue) {
          handleSubmit();
        }
      }
    };
    window.addEventListener("keyup", handleTypeEnter);
    return () => {
      window.removeEventListener("keyup", handleTypeEnter);
    };
  }, [handleSubmit, chatValue]);

  useEffect(() => {
    setMessages(listMessage);
  }, [roomID, listMessage])

  return (
    <Row>
      <Col span={24} style={{ height: "65px" }}>
        <Header hostName={hostName} photoURL={photoURL} />
      </Col>
      <Col
        span={24}
        className='chatRoom'
        style={{ height: "calc(100vh - 65px - 50px)", overflowY: "scroll", overflowX: "hidden" }}
      >
        <ChatRoom
          hostName={hostName}
          photoURL={photoURL}
          hostId={userSelectedId}
          messages={messages}
          roomID={roomID}
        />
      </Col>
      <Col span={24} style={{ height: "50px" }}>
        <Footer onChange={handleInputChat} value={chatValue} onSubmit={handleSubmit} onLike={handleLike} />
      </Col>
    </Row>
  );
};

export default ChatUI;
