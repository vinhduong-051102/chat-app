import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Protected } from "~/components";
import { MainLayout } from "~/layouts";
import { privateRoute, publicRoute } from "~/routes";
import { useEffect } from "react";
import { logout } from "~/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUpload = () => {
      dispatch(logout());
    };
    window.addEventListener("unload", handleBeforeUpload);
    window.addEventListener("beforeunload", handleBeforeUpload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUpload);
      window.removeEventListener("unload", handleBeforeUpload);
    };
  }, [dispatch]);
  return (
    <div className='App'>
      <Routes>
        {publicRoute.map((route, index) => {
          const path = route.path;
          let Layout = MainLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              path={path}
              key={index}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        <Route element={<Protected />}>
          {privateRoute.map((route, index) => {
            const { path } = route;
            let Layout = MainLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const Page = route.component;
            return (
              <Route
                path={path}
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
