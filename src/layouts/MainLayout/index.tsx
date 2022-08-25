import { Col, Row } from "antd";
import { SideBar } from "~/components";


interface propsTypes {
  children: JSX.Element;
}

const MainLayout: React.FC<propsTypes> = ({ children }) => {
  return (
    <Row style={{height: '100vh'}}>
      <Col span={5} style={{height: '100%'}}>
        <SideBar />
      </Col>
      <Col span={19}>
        {children}
      </Col>
    </Row>
  );
};

export default MainLayout;
