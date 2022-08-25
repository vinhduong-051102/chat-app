import { Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
  return (
    <div style={{ height: "100%" }}>
      <Row>
        <Col span={1} className={cx("button-wrapper")}>
          <FontAwesomeIcon icon={faCirclePlus} className={cx("button-icon")} />
        </Col>
        <Col span={22}>
          <input className={cx("input-field-chat")} placeholder="Nhập tin nhắn..." />
        </Col>
        <Col span={1} className={cx("button-wrapper")}>
          <FontAwesomeIcon icon={faThumbsUp} className={cx("button-icon")} />
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
