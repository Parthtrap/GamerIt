/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValidateEmail } from "../../Helper/functions";
import Cookies from "js-cookie";

// Get average runtime of successful runs in seconds

function LoginPage() {
  console.log("login page");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (Cookies.get("email")) {
  //     navigate("/signup");
  //   }
  // }, []);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const sumbitLoginButtonHandler = async () => {
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!ValidateEmail(email)) alert("Enter a Valid Email!");
    else if (password.length === 0) alert("Enter password");
    else {
      try {
        const userData = {
          email,
          password,
        };

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
            credentials: "include",
          }
        );

        console.log(response.status);

        const responseData = await response.json();

        if (response.status === 200) {
          console.log(responseData.message);
          auth.login(responseData.userData);
          navigate("/");
          return;
        } else if (response.status === 400) {
          console.log(responseData.error);
          alert(responseData.error);
        } else {
          throw Error("Couldn't able to login");
        }
      } catch (err) {
        console.log(err);
        alert("Failed to login");
      }
    }
  };

  const loginGoogleButtonHandler = async () => {
    try {
      console.log("fetching google auth link");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/googleAuthlink`
      );

      const responseData = await response.json();

      const googleAuthUrl = responseData.url;

      window.location.replace(googleAuthUrl);
    } catch (err) {
      console.log(err);
      alert("Looks like there is some issue. Can't login with Google :(");
    }
  };

  const forgetPassButtonHandler = async () => {
    try {
      localStorage.setItem("isCreatingAccount", false);
      navigate("/verifyEmail");
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const createAccountButtonHandler = async () => {
    try {
      localStorage.setItem("isCreatingAccount", true);
      navigate("/verifyEmail");
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto rounded-md shadow-md bg-divcol md:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign in
          </h1>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-purple-50">
              Email
            </label>
            <input
              type="email"
              ref={emailInputRef}
              autoComplete="email"
              className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-purple-50">
              Password
            </label>
            <input
              type="password"
              ref={passwordInputRef}
              autoComplete="password"
              className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <button
            onClick={forgetPassButtonHandler}
            className="text-xs text-purple-600 hover:underline"
          >
            Forget Password?
          </button>
          <div className="mt-6">
            <button
              onClick={sumbitLoginButtonHandler}
              // disabled={LoginButtonIsDisabled}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
          <p className="mt-8 text-xs font-light text-center text-purple-50">
            login using{" "}
            <button
              className="font-medium text-purple-600 hover:underline"
              onClick={loginGoogleButtonHandler}
            >
              Google
            </button>
          </p>
          <p className="mt-8 text-xs font-light text-center text-purple-50">
            Don't have an account?{" "}
            <button
              onClick={createAccountButtonHandler}
              className="font-medium text-purple-600 hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
