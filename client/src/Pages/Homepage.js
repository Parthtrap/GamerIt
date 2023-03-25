import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import CommunityListCard from "./Components/CommunityListCard";
import PostListCard from "./Components/PostListCard";
import Search from "./Components/Search";

export default function Homepage() {

  const [PostList, setPostList] = useState([]);

  // fething all posts
  useEffect(()=>{
    const findAllPosts = async ()=>{

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
    }

    findAllPosts();

  },[]);
  

  return (
    <div className="flex flex-col w-full min-h-[91vh] p-5 mt-16 bg-background md:w-3/4">
      <div className="tofade "><Search /></div>
      <div className="delay-1000 tofade ">
        {PostList.map((post) => {
          return <PostListCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}

