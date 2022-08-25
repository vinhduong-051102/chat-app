import { faFaceSmile, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./ChatRoom.module.scss";

const cx = classNames.bind(styles);

interface propsTypes {
  children: string;
  role?: "user" | "client";
}

const ChatContent: React.FC<propsTypes> = ({ children, role = "user" }) => {
  if (role === "client") {
    return (
      <div className={cx("content-wrapper")}>
        <div id={cx(role)} className={cx("content")}>
          <p>{children}</p>
          <div className={cx("icon-group")}>
            <button className={cx("chat-icon")}>
              <FontAwesomeIcon icon={faFaceSmile} />
            </button>
            <button className={cx("chat-icon")}>
              <FontAwesomeIcon icon={faReply} />
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={cx("content-wrapper")}>
      <div id={cx(role)} className={cx("content")}>
        <div className={cx("icon-group")}>
          <button className={cx("chat-icon")}>
            <FontAwesomeIcon icon={faReply} />
          </button>
          <button className={cx("chat-icon")}>
            <FontAwesomeIcon icon={faFaceSmile} />
          </button>
        </div>
        <p>{children}</p>
      </div>
    </div>
  );
};

export default ChatContent;
