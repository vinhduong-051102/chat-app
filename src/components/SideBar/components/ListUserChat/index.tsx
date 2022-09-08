import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Col, Row, Space } from "antd";
import classNames from "classnames/bind";
import { dotdotdot } from "~/helper";
import styles from "./ListUserChat.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

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

interface propsTypes {
  data: Array<roomChat>;
}

const ListUserChat: React.FC<propsTypes> = ({ data }) => {
  const [isActive, setIsActive] = useState(-1);
  const handleSelectChatRoom = (index: number) => {
    setIsActive(index);
  };
  
  return (
    <div style={{ width: "100%" }} className={cx("wrapper")}>
      <Row>
        <Space direction='vertical' size='middle'>
          {data.map((item, index) => {
            return (
              <Link to={`${item.roomID}/`} key={index}>
                <Col
                  span={24}
                  id={cx("room-chat-wrapper")}
                  onClick={() => handleSelectChatRoom(index)}
                  style={
                    index === isActive
                      ? {
                          borderRadius: "6px",
                          backgroundColor: "rgba(243, 241, 241, 0.637)",
                          border: "1px solid rgba(243, 241, 241, 0.637)",
                        }
                      : {}
                  }
                >
                  <Row align='middle'>
                    <Space size='middle'>
                      <Col span={24}>
                        <div className={cx("avatar-wrapper")}>
                          <Avatar size={50} src={item.photoURL} style={{ marginBottom: 5 }} />
                          {item.isLogin && <span className={cx("online-checker")}></span>}
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className={cx("user-name")}>{item.displayName}</div>
                        <div className={cx("latest-message")}>
                          {dotdotdot(item.latestMessage, 14)} 12:09
                        </div>
                      </Col>
                    </Space>
                  </Row>
                  <div className={cx("seen")} id={cx("icon-wrapper")}>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </Col>
              </Link>
            );
          })}
        </Space>
      </Row>
    </div>
  );
};

export default ListUserChat;
