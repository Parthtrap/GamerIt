import { createContext, useEffect, useState } from "react";

//creating auth-context object
const AuthContext = createContext({
  isLoggedIn: false,
  isFetched:  false, 
  userName: null,
  userEmail: null,
  login: (user) => {},
  logout: () => {},
});

//main component containing auth-context object and its functions 
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetched,setIsFetched] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const login = (user) => {
    setUserName(user.userName);
    setUserEmail(user.userEmail);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      //sending request to server
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/logout`,
        {
          credentials: "include",
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        console.log("logged out");
      } else throw Error(responseData.error);
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
      return;
    }
    setIsLoggedIn(false);
    setUserName(null);
    setUserEmail(null);
    window.location.replace(`${process.env.REACT_APP_CLIENT_ROOT_URI}`);
  };

  console.log("userName:", userName);
  console.log("userEmail:",userEmail);

  console.log("isLogin:", isLoggedIn);
  useEffect(() => {
    const authTokenLogin = async () => {
      console.log("sending request to access token check api");

      //fetch request to verify login/access token
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/tokenLogin`,
          {
            credentials: "include",
          }
        );

        console.log("response status:", response.status);
        const responseData = await response.json();

        if (response.status === 200) {
          console.log("access token verified successfully");
          //   console.log(responseData.userData);
          login(responseData.userData);
        } else if (response.status === 400) {
          console.log(responseData.error);
          if (isLoggedIn) {
            alert("Session timeout. Please login again");
            logout();
          }
          return;
        } else {
          throw Error(responseData.error);
        }
      } catch (err) {
        console.log(err);
        if (isLoggedIn) {
          alert("Failed to authenticate");
          logout();
        }
      }
      setIsFetched(true);
    };

    authTokenLogin();
    // eslint-disable-next-line
  }, []);

  const context = {
    isLoggedIn: isLoggedIn,
    userName: userName,
    userEmail: userEmail,
    login: login,
    logout: logout,
  };

  //mapping values and providing auth-context access to all its childrens
  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
