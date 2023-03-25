/** @format */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateEmail } from "../../Helper/functions";
// import Container from "../../Components/Shared/Container";

const EmailVerifyPage = () => {
  console.log("Email Verification Page");

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("isCreatingAccount")) {
      navigate("/login");
    }
  }, []);

  var enteredEmail;
  var isButtonOn = true;

  const submitButtonHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const isCreatingAccount = localStorage.getItem("isCreatingAccount");

    if (!ValidateEmail(email)) alert("Enter a Valid Email!");
    else {
      if (enteredEmail === email && !isButtonOn) {
        alert("Requesting for otp. Please wait!");
        return;
      }

      enteredEmail = email;
      isButtonOn = false;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/getOtp?email=${email}&isCreatingAccount=${isCreatingAccount}`,
          {
            credentials: "include",
          }
        );

        console.log(response.status);
        const responseData = await response.json();
        isButtonOn = true;

        if (response.status === 200) {
          console.log(responseData.message);
          alert("OTP sent to your email");
          navigate("/verifyOTP");
        } else if (response.status === 400) {
          console.log(responseData.error);
          alert(responseData.error);
        } else {
          throw Error("couldn't able to send otp");
        }
      } catch (err) {
        console.log(err);
        alert("Failed to send otp");
      }
    }
  };

  const emailInputRef = useRef();
  // const [submitButtonHandler, setSubmitButtonHandler] =
  //   useState(submitFunction);

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto rounded-md shadow-md bg-divcol md:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Verify Email
          </h1>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-purple-50">
              Email
            </label>
            <input
              type="email"
              ref={emailInputRef}
              className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          
          
          <div className="mt-6">
            <button
              onClick={submitButtonHandler}
              // disabled={LoginButtonIsDisabled}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Get OTP
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default EmailVerifyPage;
