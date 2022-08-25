import { Avatar, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideo, faMagnifyingGlass, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  return (
    <Row style={{ height: 65, borderBottom: "1px solid #ccc" }} align='middle'>
      <Col span={20}>
        <Row align='middle'>
          <Col style={{ margin: "0 12px" }}>
            <Avatar src='https://picsum.photos/200/300' />
          </Col>
          <Col>
            <p style={{ fontWeight: 600, fontSize: 16, textAlign: "center", marginBottom: 0 }}>
              Nguyen Chien
            </p>
          </Col>
        </Row>
      </Col>
      <Col span={4}>
        <Row justify='end'>
          <Col className={cx("icon-wrapper")}>
            <button className={cx("header-icon")}>
              <FontAwesomeIcon icon={faPhone} />
            </button>
          </Col>
          <Col className={cx("icon-wrapper")}>
            <button className={cx("header-icon")}>
              <FontAwesomeIcon icon={faVideo} />
            </button>
          </Col>
          <Col className={cx("icon-wrapper")}>
            <button className={cx("header-icon")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </Col>
          <Col className={cx("icon-wrapper")}>
            <button className={cx("header-icon")}>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
