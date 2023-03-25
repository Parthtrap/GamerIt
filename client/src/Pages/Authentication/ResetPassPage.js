/** @format */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import Container from "../../Components/Shared/Container";

const ResetPassPage = () => {
  console.log("reset password page");
  const navigate = useNavigate();

  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  
  useEffect(() => {
    if (!localStorage.getItem("userEmail")) {
      navigate("/verifyEmail");
    }
  }, []);

  const resetButtonHandler = async () => {
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    if (password.length < 8) alert("Password must be of at least 8 characters");
    else if (password !== confirmPassword)
      alert("Confirmed password doesn't matches");
    else {
      const data = {
        password,
      };

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/user/resetPassword`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          }
        );

        const responseData = await response.json();

        console.log("response status:", response.status);

        if (response.status === 200) {
          console.log(responseData.message);
          alert("Password reset done. Please login.");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("isCreatingAccount");
          navigate("/login");
          return;
        } else if (response.status === 400) {
          console.log(responseData.error);
          alert(responseData.error);
        } else {
          console.log(responseData.error);
          alert("Looks like there is some issue. Please verify again.");
          navigate("/verifyEmail");
        }
      } catch (err) {
        console.log(err);
        alert("Couldn't able to reset password");
      }
    }
  };

  return (
    // <>
    //   <div className="container mx-auto">
    //     <div className="flex justify-center px-6 my-12 ">
    //       {/* <!-- Col --> */}
    //       <div className="w-1/2 bg-white p-5 rounded-lg border ">
    //         <form className="px-8 pt-6 pb-8 bg-white rounded d-flex flex-column">
    //           <h2 className="pt-4 mb-1">Enter New Password</h2>
    //           <div className="mb-4">
    //             <label
    //               className="block text-sm font-bold text-gray-700"
    //               for="password"
    //             ></label>
    //             <input
    //               className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //               id="password"
    //               type="password"
    //               ref={passwordInputRef}
    //               placeholder="Enter your password..."
    //             />
    //           </div>
    //           <h2 className="pt-4  mb-1">Confirm Password</h2>
    //           <div className="mb-6">
    //             <label
    //               className="block text-sm font-bold text-gray-700"
    //               for="password"
    //             ></label>
    //             <input
    //               className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //               id="confirmPassword"
    //               type="password"
    //               ref={confirmPasswordInputRef}
    //               placeholder="Confirm password..."
    //             />
    //           </div>
    //           <div className="mb-1 text-center">
    //             <button
    //               className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
    //               type="button"
    //               onClick={resetButtonHandler}
    //             >
    //               Change Password
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto rounded-md shadow-md bg-divcol md:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Reset Password
          </h1>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-purple-50">
              New Password 
            </label>
            <input
              type="password"
              ref={passwordInputRef}
              className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-purple-50">
              Confirm Password
            </label>
            <input
              type="password"
              ref={confirmPasswordInputRef}
              className="block w-full px-4 py-2 mt-2 text-purple-300 border rounded-md bg-gr focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          
          <div className="mt-6">
            <button
              onClick={resetButtonHandler}
              // disabled={LoginButtonIsDisabled}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Enter
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ResetPassPage;
