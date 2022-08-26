import { Button, Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "~/features/auth/authSlice";
import { auth } from "~/firebase/config";

const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithGoogle, user, _loading, _error] = useSignInWithGoogle(auth);
  useEffect(() => {
    if (user) {
      dispatch(login(user));
      navigate("/");
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
