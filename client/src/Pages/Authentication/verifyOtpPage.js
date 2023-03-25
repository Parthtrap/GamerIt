/** @format */

import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyOtpPage = () => {
  const navigate = useNavigate();

  const otpInputRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem("isCreatingAccount")) {
      navigate("/login");
    }
  }, []);

  const submitButtonHandler = async (event) => {
    event.preventDefault();

    const otp = otpInputRef.current.value;

    if (otp.length !== 4) alert("Enter a valid OTP");
    else {
      console.log(otp);

      try {
        console.log("got otp");
        const data = JSON.stringify({
          otp,
        });

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/verifyOtp`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: data,
            credentials: "include",
          }
        );

        const responseData = await response.json();
        console.log("response status:", response.status);

        if (response.status === 200) {
          console.log(responseData.message);
          console.log(responseData.isCreatingAccount);
          if (responseData.isCreatingAccount) {
            console.log(responseData);
            localStorage.setItem("userEmail", responseData.userEmail);
            navigate("/signup");
          } else {
            localStorage.setItem("userEmail", responseData.userEmail);
            navigate("/resetPassword");
          }
          return;
        } else if (response.status === 400) {
          console.log(responseData.error);
          alert(responseData.error);
          navigate("/verifyEmail");
          return;
        } else {
          console.log(responseData.error);
          alert("Looks like there is some issue. Please verify again.");
          navigate("/verifyEmail");
        }
      } catch (err) {
        console.log(err);
        alert("can't verify OTP");
        return;
      }
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto rounded-md shadow-md bg-divcol md:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Verify OTP
          </h1>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-purple-50">
              Enter 4 digit OTP sent to your email
            </label>
            <input
              type="text"
              ref={otpInputRef}
              className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={submitButtonHandler}
              // disabled={LoginButtonIsDisabled}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Submit
            </button>
          </div>
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
};

export default VerifyOtpPage;
