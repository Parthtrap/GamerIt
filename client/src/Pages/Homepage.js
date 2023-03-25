import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import CommunityListCard from "./Components/CommunityListCard";
import PostListCard from "./Components/PostListCard";
import Search from "./Components/Search";

export default function Homepage() {

  const [PostList, setPostList] = useState([]);

  

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

