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
      <div className="container mx-auto">
        <div className="flex justify-center mb-2 px-6 my-12 ">
          {/* <!-- Col --> */}
          <div className="w-1/2 bg-white p-5 mb-2 rounded-lg border ">
            <div className="mb-4">
              <h1 className=" text-center text-xl pt-4 mb-2">Verify OTP</h1>
            </div>

            <div className="px-8 pt-6 pb-8 bg-white rounded mb-2 d-flex flex-column">
              <h2 className="pt-4 mb-2 text-sm">
                Enter 4 digit code sent to your email
              </h2>
              <div className="mb-4">
                <label
                  className="block text-sm font-bold text-gray-700"
                  htmlFor="password"
                ></label>
                <input
                  ref={otpInputRef}
                  type="text"
                  required
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="otp"
                  placeholder="Enter OTP..."
                />
              </div>

              <div className="mb-2 text-center">
                <button
                  onClick={submitButtonHandler}
                  className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Submit
                </button>
              </div>
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
      </div>
    </>
  );
};

export default VerifyOtpPage;
