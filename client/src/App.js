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
import Profilepage from "./Pages/Profilepage";
import Homepage from "./Pages/Homepage";
import Sidebar from "./Pages/Components/SideBar";
import Communitypage from "./Pages/Communitypage";
import CreatePostPage from "./Pages/CreatePostPage";
import MatchPage from "./Pages/Components/NewRequestmodel";
import Notes from "./Pages/Components/Notes";
import Postpage from "./Pages/Postpage";
import NewNotificationModel from "./Pages/Components/NewNotificationModel";

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
            <Navbar isLoggedIn={true} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <div className="flex theme-dark">
                    <Homepage/>
                    <Sidebar />
                  </div>
                }
              />
              <Route exact path="/createPost" element={<CreatePostPage />} />
              <Route
                exact
                path="/community/:id"
                element={
                  <div className="flex theme-dark">
                    <Communitypage/>
                    <Sidebar/>
                  </div>
                }
              />
              <Route
                exact
                path="/profile/:id"
                element={
                  <div className="flex theme-dark">
                    <Profilepage />
                    <Sidebar />
                  </div>
                }
              />
              <Route
                exact
                path="/match/:id"
                element={
                  <div className="flex theme-dark">
                    <MatchPage />
                    <Sidebar />
                  </div>
                }
              />
              <Route
                exact
                path="/notes/:id"
                element={
                  <div className="flex theme-dark">
                    <Notes />
                    <Sidebar />
                  </div>
                }
              />
              <Route
                exact
                path="/post/:id"
                element={
                  <div className="flex theme-dark">
                    <Postpage />
                    <Sidebar />
                  </div>
                }
              />
              <Route exact path="*" element={<Navigate to="/" />} />
              <Route exact path="/notifications" element={<NewNotificationModel />} />
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
                    <Homepage/>
                    <Sidebar />
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
                    <Communitypage/>
                    <Sidebar/>
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
