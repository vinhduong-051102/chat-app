import { Avatar, Col, Row, Space } from "antd";
import classNames from "classnames/bind";
import styles from "./ChatRoom.module.scss";
import { ChatContent } from "./components";

interface message {
  uid: string;
  content: string;
  createdAt: number;
  roomID: string;
}
interface propsTypes {
  hostName: string;
  hostId: string;
  photoURL: string;
  messages: message[];
  roomID: string;
}

const cx = classNames.bind(styles);


const ChatRoom: React.FC<propsTypes> = ({ hostName, photoURL, messages, hostId, roomID }) => {
  const messagesInThisRoom = messages.filter(message => message.roomID === roomID);
  for(let i = 0; i < messagesInThisRoom.length - 1; i++) {
    for(let j = i + 1; j < messagesInThisRoom.length; j++) {
      if(messagesInThisRoom[j].createdAt < messagesInThisRoom[i].createdAt) {
        let temp: message = messagesInThisRoom[i]
        messagesInThisRoom[i] = messagesInThisRoom[j]
        messagesInThisRoom[j] = temp 
      }
    }
  }
  
  return ( 
    <Row style={{ height: "100%" }}>
      <Col span={24} style={{ marginBottom: 30 }}>
        <Row align='middle' justify='center' style={{ height: 200 }}>
          <Space direction='vertical'>
            <Col style={{ display: "flex" }}>
              <Avatar src={photoURL} size={80} style={{ margin: "auto" }} />
            </Col>
            <Col>
              <p className={cx("client-name")}>{hostName}</p>
            </Col>
          </Space>
        </Row>
      </Col>
      {/* chat */}
      {messagesInThisRoom.map((message, index) => {
        const { content, uid } = message;
        return (
          <Col span={24} style={{ height: 50 }} key={index}>
            <ChatContent role={uid !== hostId ? "user" : "client"}>{content}</ChatContent>
          </Col>
        );
      })}
      {/* chat */}
    </Row>
  );
}

export default ChatRoom;