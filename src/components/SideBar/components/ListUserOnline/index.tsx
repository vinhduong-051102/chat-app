import { Avatar, Col, Row, Space } from "antd";
import classNames from "classnames/bind";
import { dotdotdot } from "~/helper";
import styles from "./ListUserOnline.module.scss";
import { Link } from "react-router-dom"

const cx = classNames.bind(styles);

interface userTypes {
  displayName: string;
  isLogin: boolean;
  loginAt: number;
  photoURL: string;
  uid: string;
}

interface propsTypes {
  data: Array<userTypes>;
}

const ListUserOnline: React.FC<propsTypes> = ({ data }) => {
  return (
    <Row style={{ overflowX: "scroll" }}>
      <Space size={20}>
        {data.map((item) => {
          return (
            <Col key={item.uid} style={{ maxWidth: 50}}>
              <Link to={`/chat-room/${item.uid}`}>
                <div className={cx("avatar-wrapper")}>
                  <Avatar size={50} src={item.photoURL} style={{ marginBottom: 5 }} alt="avatar" />
                  {item.isLogin && <span className={cx("online-checker")}></span>}
                </div>
                <p
                  style={{ fontSize: "12px", fontWeight: 420, textAlign: "center", marginBottom: 10 }}
                  className={cx("user-name")}
                >
                  {dotdotdot(item.displayName, 10)}
                </p>
              </Link>
            </Col>
          );
        })}
      </Space>
    </Row>
  );
};

export default ListUserOnline;
