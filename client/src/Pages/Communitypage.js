/** @format */

import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import PostListCard from "./Components/PostListCard";
import PostListCardBig from "./Components/PostListCardBig";
import NewMyModal from "./Components/NewRequestmodel";

function Communitypage() {
  const param = useParams();
  const auth = useContext(AuthContext);

  const [communityDetails, setCommunityDetails] = useState({
    followers: 0,
    imgsrc: "Loading...",
    name: "Loading...",
    tagline: "Loading...",
  });
  const [CommunityPostList, setCommunityPostList] = useState([]);
  const [userData, setUserData] = useState({
    username: "Loading...",
    email: "Loading...",
    gender: "Loading",
    dateofbirth: Date.now(),
    notes: [],
    likedcommunities: [],
    likedposts: [],
    isadmin: false,
});
  const [followed, setFollowed] = useState(false);

  const toggleRef = useRef(document.createElement("input"));
  const [toggle, setToggle] = useState(false);

  const [request, setRequest] = useState(false);

  function onClose(e) {
    e.preventDefault();
    setRequest(false);
  }

  return (
    <div className="bg-background w-full min-h-[41rem] mt-16">
          <div className="bg-fill flex flex-col gap-6 p-10 md:m-16 tofade w-10%">
              
              <div className="flex items-center justify-between space-x-4">

                  <div className="flex items-center space-x-4">
                      <div className="bg-cover bg-no-repeat bg-top bg-[url(https://i.imgur.com/nkH4gCV.png)] w-20 h-20 rounded-full" />
                      <div className="text-tprimary text-4xl font-medium ">
                          <div>Jese Leos</div>
                          <div className="text-tmuted text-lg">Joined in 9/11</div>
                      </div>
                  </div>

                  <div className="flex">
                      <button type="button" 

                      className="flex gap-2 text-tprimary bg-base hover:bg-background
                      focus:outline-none focus:ring-2 
                      focus:ring-tmuted
                      font-medium rounded-full t
                      ext-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit Community
                      </button> 

                      <button type="button" 
                        onClick={() => (setRequest(true))}
                      className="flex gap-2 text-tprimary bg-base hover:bg-background
                      focus:outline-none focus:ring-2 
                      focus:ring-tmuted
                      font-medium rounded-full t
                      ext-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Find People           
                      </button> 
                  </div>

              </div>

              {/*random text in the profile*/}
              <div>
                  <div className="text-tprimary font-medium text-lg">
                      <p>You learn something new every day; what did you learn today?</p>
                      <p>Submit interesting and specific facts that you just found out 
                      (not broad information you looked up, Today Learned is not /r/wikipedia).</p>
                      <p className="mt-4 text-tmuted">Followed Community: {userData.likedcommunities.length}</p>
                      <p className="text-tmuted">Posts: {CommunityPostList.length}</p>
                  </div>

              </div>
              
          </div>

          {/*list of all posts posted*/}
          <div className="bg-fill flex flex-col gap-6 p-10 md:m-16 tofade w-10%">
          <div className="text-tprimary text-5xl font-bold text-center ">Posts</div>
          
          {/* view toggel */}
          <div className="mx-auto"> 
              <label class="relative inline-flex items-center cursor-pointer">
                  <input ref={toggleRef} onChange={()=>{setToggle(!toggle)}} type="checkbox" class="sr-only peer" />
                  <div  class="w-11 h-6 bg-background  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-base"></div>
                  <span class="text-tmuted ml-1 text-sm font-medium ">Toggle View</span>
              </label>
          </div>

          <div className="">
              {toggle ? CommunityPostList.map((post) => {
                  return <PostListCard key={post._id} post={post} />;
              }): CommunityPostList.map((post) => {
                  return <PostListCardBig key={post._id} post={post} />;
              })}
          </div>
          
          </div>

          {request ? <NewMyModal onClose={onClose}/> : <></>}
      </div>
  );
}

export default Communitypage;
