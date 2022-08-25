import { FacebookOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "~/features/auth/authSlice";
import { auth, db } from "~/firebase/config";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signInWithFacebook, _user, _loading, _error] = useSignInWithFacebook(auth);
  const setUserInDB = async (user: User | null) => {
    try {
      if (user) {
        await setDoc(
          doc(db, "users", user.uid as string),
          {
            displayName: user.displayName,
            photoURL: user.photoURL,
            loginAt: Date.now(),
            isLogin: true,
            uid: user.uid,
          },
          { merge: true }
        );
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const Auth = auth;
  const handleLogin = () => {
    signInWithFacebook()
      .then(() => {
        Auth.onAuthStateChanged((user) => {
          setUserInDB(user);
          
          dispatch(login(user));
        });
        navigate("/");
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  return (
    <div>
      <Button onClick={handleLogin}>
        Đăng nhập bằng Facebook
        <FacebookOutlined />
      </Button>
    </div>
  );
}

export default Login;
