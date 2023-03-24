import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./Pages/Components/Navbar";
import LoginPage from "./Pages/Authentication/LoginPage";
import Signup from "./Pages/Authentication/SignupPage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useContext } from "react";
import AuthContext from "./Context/AuthContext";
import EmailVerifyPage from "./Pages/Authentication/EmailVerifyPage";
import VerifyOtpPage from "./Pages/Authentication/verifyOtpPage";
import NotFound from "./Pages/NotFound";
import ResetPassPage from "./Pages/Authentication/ResetPassPage";

const App = () => {
  const auth = useContext(AuthContext);
  return auth.isFetched ? (
    <>
      {
        auth.isLoggedIn ? (
          <>
            <ToastContainer
              autoClose={1000}
              position={toast.POSITION.BOTTOM_RIGHT}
              hideProgressBar
              theme="dark"
            />
            <Navbar isLoggedIn={false} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <div className="flex">
                    Homepage
                  </div>
                }
              />
              <Route
                exact
                path="/community/:id"
                element={
                  <div className="flex ">
                    community page
                  </div>
                }
              />
              <Route exact path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <>
            <ToastContainer
              autoClose={1000}
              position={toast.POSITION.BOTTOM_RIGHT}
              hideProgressBar
              theme="dark"
            />
            <Navbar isLoggedIn={false} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <div className="flex">
                    Homepage
                  </div>
                }
              />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/verifyEmail" element={<EmailVerifyPage />} />
              <Route exact path="/verifyOTP" element={<VerifyOtpPage />} />
              <Route exact path="/resetPassword" element={<ResetPassPage />} />
              <Route
                exact
                path="/community/:id"
                element={
                  <div className="flex ">
                    community page
                  </div>
                }
              />
              <Route exact path="*" element={<NotFound />} />
            </Routes>
          </>
        )
      }
    </>
  ) : (
    <>
      Loading
    </>
  );
}

export default App;
