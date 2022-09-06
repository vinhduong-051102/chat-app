import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCirclePlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

interface propsTypes {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onLike: React.MouseEventHandler<HTMLButtonElement>;
}

const Footer: React.FC<propsTypes> = ({ onChange, value, onSubmit, onLike }) => {
  return (
    <div style={{ height: "100%" }}>
      <Row>
        <Col span={1} className={cx("button-wrapper")}>
          <FontAwesomeIcon icon={faCirclePlus} className={cx("button-icon")} />
        </Col>
        <Col span={22}>
          <input
            className={cx("input-field-chat")}
            placeholder='Nhập tin nhắn...'
            onChange={onChange}
            value={value}
          />
        </Col>
        <Col span={1} className={cx("button-wrapper")}>
          {value.trim().length > 0 ? (
            <button onClick={onSubmit}>
              <FontAwesomeIcon icon={faPaperPlane} className={cx("button-icon")} />
            </button>
          ) : (
            <button onClick={onLike}>
              <FontAwesomeIcon icon={faThumbsUp} className={cx("button-icon")} />
            </button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
