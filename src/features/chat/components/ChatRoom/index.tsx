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
}

const cx = classNames.bind(styles);


const ChatRoom: React.FC<propsTypes> = ({ hostName, photoURL, messages, hostId }) => {
  for(let i = 0; i < messages.length - 1; i++) {
    for(let j = i + 1; j < messages.length; j++) {
      if(messages[j].createdAt < messages[i].createdAt) {
        let temp: message = messages[i]
        messages[i] = messages[j]
        messages[j] = temp 
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
      {messages.map((message, index) => {
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