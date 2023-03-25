/** @format */

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Signup() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();
  const phonenumref = useRef();
  const [userEmail,setUserEmail] = useState(localStorage.getItem("userEmail"));
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("email")) {
      localStorage.setItem("userEmail", Cookies.get("email"));
      setUserEmail(localStorage.getItem("userEmail"));
    }

    if (!userEmail) {
      navigate("/verifyEmail");
    }
  }, []);

  const submitButtonHandler = async (event) => {
    event.preventDefault();
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmpasswordRef.current.value;
    const phoneNumber = phonenumref.current.value;

    if (userName.length === 0) alert("Enter username");
    else if (password.length === 0) alert("Enter password");
    else if (userName.length > 30) alert("Username too large");
    else if (password.length < 8)
      alert("Password must be of at least 8 characters");
    else if (password !== confirmPassword)
      alert("Confirmed password doesn't matches");
    else if (phoneNumber.length > 15 || phoneNumber.length < 10)
      alert("Enter a valid phone number");
    else {
      const data = {
        username: userName,
        password: password,
        email: localStorage.getItem("userEmail"),
        phonenumber: phoneNumber,
      };
      try {
        console.log("got user data");
        const userData = JSON.stringify(data);

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/user/add`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: userData,
            credentials: "include",
          }
        );

        const responseData = await response.json();
        console.log("response status:", response.status);

        if (response.status === 200) {
          console.log(responseData.message);
          alert("Account created. Please login.");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("isCreatingAccount");
          navigate("/login");
          return;
        } else if (response.status === 400) {
          console.log(responseData.message);
          alert(responseData.message);
        } else {
          console.log(responseData.message);
          alert("Looks like there is some issue. Please verify again.");
          navigate("/verifyEmail");
          return;
        }
      } catch (err) {
        console.log(err);
        alert("Looks like there is some issue. Please verify again.");
        navigate("/verifyEmail");
        return;
      }
    }
  };

  const goToLoginPageButtonHandler = async ()=>{
    console.log("sfds");
    Cookies.remove('email');
    navigate("/login");
    return;
  }

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto mt-20 rounded-md shadow-md bg-divcol md:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-300 underline">
            Sign Up
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-purple-50">
                Username
              </label>
              <input
                type="text"
                ref={usernameRef}
                className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-purple-50">
                Email
              </label>
              <p className="block text-sm font-semibold text-purple-600">
                {localStorage.getItem("userEmail")}
              </p>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-purple-50">
                Password
              </label>
              <input
                type="password"
                ref={passwordRef}
                autoComplete="password"
                className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-purple-50">
                Confirm Password
              </label>
              <input
                type="password"
                ref={confirmpasswordRef}
                autoComplete="password"
                className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-purple-50">
                Phone Num
              </label>
              <input
                type="number"
                ref={phonenumref}
                className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 appearance-none focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={submitButtonHandler}
                // disabled={SignupButtonIsDisabled}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-purple-50">
            Already have an account?{" "}
            <button
              onClick={goToLoginPageButtonHandler}
              className="font-medium text-purple-600 hover:underline"
            >
              Log In
            </button>
          </p>
          <p className="mt-8 text-xs font-light text-center text-purple-50">
            <Link
              to="/verifyEmail"
              className="font-medium text-purple-600 hover:underline"
            >
              Enter Email again
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
