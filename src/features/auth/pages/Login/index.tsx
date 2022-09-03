import { Button, Col, Row, Typography } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "~/features/auth/authSlice";
import { auth, db } from "~/firebase/config";

const { Title } = Typography;

interface message {
  uid: string;
  content: string;
  createdAt: string;
  roomID: string;
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithGoogle, user, _loading, _error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (user) {
      const uid = user.user.uid;
      getDoc(doc(db, "users", uid)).then((doc) => {
        const data = doc.data();
        const isLogin = data?.isLogin;
        if (!isLogin) {
          dispatch(login(user));
          navigate("/chat-room");
        } else {
          alert("Tài khoản đã đăng nhập tại nơi khác");
        }
      });
    }
  }, [user, dispatch, navigate]);
  const handleLogin = () => {
    signInWithGoogle();
  };

  return (
    <div>
      <Row justify='center' style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat App
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }} onClick={handleLogin}>
            Đăng nhập bằng Google
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
