import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Col, Row, Space } from "antd";
import classNames from "classnames/bind";
import { dotdotdot } from "~/helper";
import styles from "./ListUserChat.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

interface userChat {
  url: string;
  name: string;
  latestMessage: string;
  isOnline: boolean;
}

interface propsTypes {
  data: Array<userChat>;
}

const ListUserChat: React.FC<propsTypes> = ({ data }) => {
  const [isActive, setIsActive] = useState(-1);
  const handleSelectChatRoom = (index: number) => {
    setIsActive(index);
  };
  data = [
    {
      url: "https://picsum.photos/200/300",
      name: "Picsum",
      latestMessage: "Học tiewps đã tí bàn sau",
      isOnline: true,
    },
    { url: "https://picsum.photos/200/300", name: "Picsum", latestMessage: "2", isOnline: true },
    { url: "https://picsum.photos/200/300", name: "Picsum", latestMessage: "2", isOnline: true },
    { url: "https://picsum.photos/200/300", name: "Picsum", latestMessage: "3", isOnline: true },
    { url: "https://picsum.photos/200/300", name: "Picsum", latestMessage: "3", isOnline: true },
  ];
  return (
    <div style={{ width: "100%" }} className={cx("wrapper")}>
      <Row>
        <Space direction='vertical' size='middle'>
          {data.map((item, index) => {
            return (
              <Col
                span={24}
                key={index}
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
                        <Avatar size={50} src={item.url} style={{ marginBottom: 5 }} />
                        {item.isOnline && <span className={cx("online-checker")}></span>}
                      </div>
                    </Col>
                    <Col span={24}>
                      <div className={cx("user-name")}>{item.name}</div>
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
            );
          })}
        </Space>
      </Row>
    </div>
  );
};

export default ListUserChat;
