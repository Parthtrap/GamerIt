/** @format */

import { async } from "@firebase/util";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
//import CommunityListCard from "./Components/CommunityListCard";
import PostListCard from "./Components/PostListCard";
import PostListCardBig from "./Components/PostListCardBig";
import Search from "./Components/Search";

export default function Homepage() {
  const [PostList, setPostList] = useState([]);

  const toggleRef = useRef(document.createElement("input"));
  const [toggle, setToggle] = useState(false);

  //fething all posts
  useEffect(() => {
    const findAllPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/post/`
        );

        console.log(response.status);

        const responseData = await response.json();

        if (response.status === 200) {
          setPostList(responseData);
          return;
        } else if (response.status === 400) {
          console.log(responseData.error);
          alert(responseData.error);
          return;
        } else {
          throw Error("Couldn't able to login");
        }
      } catch (err) {
        console.log(err);
        alert("Something went wrong. Try again");
        return;
      }
    };

    findAllPosts();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-[91vh] p-5 mt-16 bg-background md:w-3/4">
      <div className="tofade ">
        <Search />
      </div>
      <div className="delay-1000 tofade ">
        {/* view toggel */}
        <div className="flex justify-center pt-2">
          <div className="bg-">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                ref={toggleRef}
                onChange={() => {
                  setToggle(!toggle);
                }}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-tmuted  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-base"></div>
              <span className="text-tmuted ml-1 text-sm font-medium ">
                Toggle View
              </span>
            </label>
          </div>
        </div>

        {!toggle
          ? PostList.map((post) => {
            console.log(post);
              return <PostListCard key={post._id} post={post} />;
            })
          : PostList.map((post) => {
              return <PostListCardBig key={post._id} post={post} />;
            })}
      </div>
    </div>
  );
}
