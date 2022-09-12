import { SearchOutlined } from "@ant-design/icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Tooltip } from "antd";
import Input from "antd/lib/input/Input";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectListUser, selectListUserOnline } from "~/app/rootReducer";
import { logout, selectUserCredential } from "~/features/auth/authSlice";
import { selectMessages, selectRooms } from "~/features/chat/chatSlice";
import { ListUserChat, ListUserOnline } from "./components";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles);

interface roomChat {
  roomID: string;
  photoURL: string;
  displayName: string;
  latestMessage: string;
  isLogin: boolean;
  createdAt: number;
  uid: string;
}

const text = <span>Đăng xuất</span>;

function SideBar() {
  const listUser = useSelector(selectListUser);
  const [listRoomOnline, setListRoomOnline] = useState(() => {
    const initialState: {
      roomID: string;
      displayName: string;
      uid: string;
      photoURL: string;
      isLogin: boolean;
    }[] = [];
    return initialState;
  });
  const [listUserChat, setListUserChat] = useState(() => {
    const initialState: { id: string; data: string[] }[] = [];
    return initialState;
  });
  const listUserOnline = useSelector(selectListUserOnline);
  const listRoom = useSelector(selectRooms);
  
  const userCredential = useSelector(selectUserCredential);
  const messages = useSelector(selectMessages);
  
  const [listRoomChat, setListRoomChat] = useState(() => {
    const initialState: roomChat[] = [];
    return initialState;
  });
  const userInfo = userCredential?.user;
  let userId = "";
  if (userInfo) {
    userId = userInfo.uid;
  }
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const listInfoUserChat: roomChat[] = [];
    listUserChat.forEach((room) => {
      const _data = messages.filter((message) => message.roomID === room.id);
      
      if (_data.length > 0) {
        const arr = [..._data].sort((a, b) => a.createdAt - b.createdAt);
        const { uid, content, roomID, createdAt } = arr[arr.length - 1];
        const otherUserId = room.data.find((uid) => uid !== userId);
        const otherUser = listUser.find((user) => user.uid === otherUserId);
        if (otherUser) {
          const { photoURL, displayName, isLogin } = otherUser;
          listInfoUserChat.push({
            isLogin,
            displayName,
            photoURL,
            uid,
            roomID,
            createdAt,
            latestMessage: content,
          });
        }
      }
    });
    
    listInfoUserChat.sort((a, b) => b.createdAt - a.createdAt);
    // console.log(listInfoUserChat)
    setListRoomChat(listInfoUserChat);
  }, [listUser, listUserChat, messages, userId]);


  useEffect(() => {
    const RoomsOnline: {
      roomID: string;
      displayName: string;
      uid: string;
      photoURL: string;
      isLogin: boolean;
    }[] = [];

    listRoom.forEach((room, index) => {
      const users: string[] = room.users;
      const id = room.roomID;
      const otherUserOnline = listUserOnline.filter((user) => user.uid !== userId);
      const isRoomOnline = otherUserOnline.some((user) => {
        return users.includes(user.uid)
      });
      if (isRoomOnline && users.includes(userId)) {
        const otherUserId = users.find((uid) => uid !== userId);
        const otherUser = listUser.find((user) => user.uid === otherUserId);
        if (otherUser) {
          const { isLogin, uid, photoURL, displayName } = otherUser;
          RoomsOnline.push({ isLogin, uid, photoURL, displayName, roomID: id });
        
        }
      }
    });
    setListRoomOnline(RoomsOnline);
  }, [listRoom, listUser, userId, listUserOnline]);

  
  useEffect(() => {
    const listRoomChat: { id: string; data: string[] }[] = [];
    listRoom.forEach((room) => {
      const users: string[] = room.users;
      const id = room.roomID;
      if (users.includes(userId)) {
        listRoomChat.push({ id, data: users });
      }
      setListUserChat(listRoomChat);
    });
  }, [listRoom, userId]);

  return (
    <Row style={{ height: "100%", borderRight: "1px solid #ccc", paddingLeft: 14 }}>
      <Col span={24} style={{ height: "13%", padding: "0 14px 18px 14px" }}>
        <Row style={{ height: "70%" }} align='middle'>
          <Col span={22} style={{ fontSize: "22px", fontWeight: "600" }}>
            Chat
          </Col>
          <Col span={2} style={{ fontSize: 18, fontWeight: "600" }}>
            <Tooltip placement='bottom' title={text}>
              <button className={cx("logout-button")} onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{ height: "30%" }}>
          <Col span={24}>
            <Input
              placeholder='Tìm kiếm'
              prefix={<SearchOutlined />}
              className={cx("search-input")}
              style={{ borderRadius: "4px" }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ height: "87%", overflowY: "scroll", overflowX: "hidden" }}>
        <Row style={{ height: "100%", width: "100%" }} justify='center'>
          <Col span={24} style={{ height: "10%", padding: "0 0 18px 10px", marginBottom: 64 }}>
            <ListUserOnline data={listRoomOnline} />
          </Col>
          <Col span={24} style={{ height: "90%" }}>
            <ListUserChat data={listRoomChat} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SideBar;
