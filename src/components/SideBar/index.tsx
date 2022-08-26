import { SearchOutlined } from "@ant-design/icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Tooltip } from "antd";
import Input from "antd/lib/input/Input";
import classNames from "classnames/bind";
import { ListUserChat, ListUserOnline } from "./components";
import styles from "./SideBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "~/features/auth/authSlice";
import { selectListUserOnline } from "~/app/rootReducer";

const cx = classNames.bind(styles);

const text = <span>Đăng xuất</span>;

function SideBar() {
  const listUserOnline = useSelector(selectListUserOnline)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Row style={{ height: "100%", borderRight: "1px solid #ccc" }}>
      <Col span={24} style={{ height: "13%", padding: "0 14px 18px 14px" }}>
        <Row style={{ height: "70%" }} align='middle'>
          <Col span={22} style={{ fontSize: "22px", fontWeight: "600" }}>
            Chat
          </Col>
          <Col span={2} style={{ fontSize: 18, fontWeight: "600" }}>
            <Tooltip placement='bottom' title={text}>
              <button className={cx("logout-button")} onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </Tooltip>
          </Col>
        </Row>
        <Row style={{ height: "30%" }}>
          <Col span={24}>
            <Input
              placeholder='Tìm kiếm'
              prefix={<SearchOutlined />}
              className={cx("search-input")}
              style={{ borderRadius: "4px" }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ height: "87%", overflowY: "scroll", overflowX: "hidden" }}>
        <Row style={{ height: "100%", width: "100%" }}>
          <Col span={24} style={{ height: "10%", padding: "0 0 18px 14px", marginBottom: "48px" }}>
            <ListUserOnline data={listUserOnline} />
          </Col>
          <Col span={24} style={{ height: "90%", marginLeft: 14 }}>
            <ListUserChat data={[]} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default SideBar;
