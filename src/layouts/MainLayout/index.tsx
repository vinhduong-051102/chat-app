import classNames from "classnames/bind";
import { SideBar } from "~/components";
import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);
interface propsTypes {
  children: JSX.Element;
}

const MainLayout: React.FC<propsTypes> = ({ children }) => {
  return (
    <div className={cx("main-layout-container")}>
      <div className={cx("sidebar")}>
        <SideBar />
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
};

export default MainLayout;
