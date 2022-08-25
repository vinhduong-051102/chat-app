import { Col, Row } from "antd";
import { ChatRoom, Header, Footer } from "./components";


function Chat() {
  return (
    <Row>
      <Col span={24} style={{ height: "65px" }}>
        <Header />
      </Col>
      <Col span={24} className='chatRoom'>
        <ChatRoom />
      </Col>
      <Col span={24} style={{ height: "50px" }}>
        <Footer />
      </Col>
    </Row>
  );
}

export default Chat;
