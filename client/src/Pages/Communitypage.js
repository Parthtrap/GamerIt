/** @format */

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import PostListCard from "./Components/PostListCard";

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
  const [userInfo, setUserInfo] = useState({});
  const [followed, setFollowed] = useState(false);

  return (
    <div className="w-full p-5 mt-16 bg-background min-h-[91.3vh] md:w-3/4">
      <div className=" bg-fill flex items-center justify-between pr-3 space-x-4 tofade rounded-xl ">
        <div className="flex items-center">
          <img
            className="object-cover w-20 h-20 ml-4 rounded-full"
            src={communityDetails.imgsrc}
          />
          <div className="ml-3">
            <div className="text-tprimary text-2xl font-bold ">
              {communityDetails.name}
            </div>
            <div className="text-tmuted text-sm ">
              {communityDetails.tagline}
            </div>
          </div>
        </div>

        <button
          // onClick={onFollowPress}
          type="button"
          className="text-tmuted from-fill to-base py-2 text-sm font-medium text-center  rounded-full bg-gradient-to-br  hover:bg-gradient-to-bl active:scale-95 px-9"
        >
          {followed ? "Unfollow" : "Follow"}
        </button>
      </div>

      <div>Search Bar and Filters</div>
      <div>
        {CommunityPostList.map((post) => {
          return <PostListCard key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}

export default Communitypage;
