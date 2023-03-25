/** @format */

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

import NewCommunityModel from "./NewCommunityModel";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const auth = useContext(AuthContext);

  const [isAdmin, setIsAdmin] = useState(true);
  const [request, setRequest] = useState(false);

  function onClose(e) {
    e.preventDefault();
    setRequest(false);
  }

  return (
    <nav className="bg-fill shadow-base fixed top-0 z-50 w-full shadow-sm ">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex ">
        <div className="">
        {request ? <NewCommunityModel onClose={onClose}/> : <></>}
          <div className="flex items-center justify-between py-4 md:block">
            <div className="md:hidden">
            
              <button
                className="text-tprimary focus:border-gray-400 p-2 rounded-md outline-none  focus:border"
                onClick={() => {
                  setNavbar(!navbar);
                  setSidebar(false);
                }}
              >
                {/* left side dropdown button*/}
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/*LOGO*/}
            <Link to="/">
              <h2 className="text-tprimary text-2xl font-bold ">GAMERIT</h2>
            </Link>

            {/* right side dropdown button*/}
            <div className="hidden">
              <button
                className=" text-primary focus:border-gray-400 p-2 rounded-md outline-none  focus:border"
                onClick={() => {
                  setSidebar(!sidebar);
                  setNavbar(false);
                }}
              >
                {sidebar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          {/* left side wala */}
          <div
            className={`flex-1 justify-self-center pb-3 mt-1 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-4 md:flex md:space-x-6 md:space-y-0">
              {auth.isLoggedIn ? (
                <>
                  {isAdmin ? 
                  <li  className="text-tprimary hover:text-tmuted">
                    <Link onClick={() => (setRequest(true))} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    </Link>
                  </li> 
                  : <></>}
                  
                  <li className="text-tprimary hover:text-tmuted">
                    <Link to="#" onClick={auth.logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link to="/help">Help</Link>
                  </li>
                </>
              )}
              {/* {auth.isLoggedIn ? (
                <>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link
                      to={"/profile/" + auth.userEmail}
                      onClick={() => {
                        setNavbar(false);
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link
                      to="/post/new"
                      onClick={() => {
                        setNavbar(false);
                      }}
                    >
                      New Post
                    </Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link
                      to="/notes"
                      onClick={() => {
                        setNavbar(false);
                      }}
                    >
                      Notes
                    </Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link
                      to="/todo"
                      onClick={() => {
                        setNavbar(false);
                      }}
                    >
                      To-Do List
                    </Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link
                      to="/help"
                      onClick={() => {
                        setNavbar(false);
                      }}
                    >
                      Help
                    </Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link to="/" onClick={auth.logout}>
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="text-tprimary hover:text-tmuted">
                    <Link to="/help">Help</Link>
                  </li>
                </>
              )} */}
            </ul>
          </div>

          {/* right side wala menu */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
