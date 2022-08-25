import { Avatar, Col, Row, Space } from "antd";
import classNames from "classnames/bind";
import styles from "./ChatRoom.module.scss";
import { ChatContent } from "./components";

const cx = classNames.bind(styles);

function ChatRoom() {
  return (
    <Row style={{ height: "100%" }}>
      <Col span={24} style={{ marginBottom: 30 }}>
        <Row align='middle' justify='center' style={{ height: 200 }}>
          <Space direction='vertical'>
            <Col style={{ display: "flex" }}>
              <Avatar src='https://picsum.photos/200/300' size={80} style={{ margin: "auto" }} />
            </Col>
            <Col>
              <p className={cx("client-name")}>Nguyen Chien</p>
            </Col>
          </Space>
        </Row>
      </Col>
      {/* chat */}
      <Col span={24} style={{height: 50}}>
        <ChatContent>Hello</ChatContent>
      </Col>
      <Col span={24} style={{height: 50}}>
        <ChatContent role='client'>Hello Guy</ChatContent>
      </Col>
      {/* chat */}
    </Row>
  );
}

export default ChatRoom;
