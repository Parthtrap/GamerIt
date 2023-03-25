import React, { useContext, useEffect, useState } from "react";
//import AuthContext from "../Authentication/AuthContext";
import CommunityListCard from "./CommunityListCard";

function Sidebar() {

  
  const [LikedCommunityList, setLikedCommunityList] = useState([]);
  const [communityList, setCommunityList] = useState([]);

  return (

    <div className="text-tprimary hidden p-1 mt-16  bg-background md:block md:w-1/4">
      <div className="border-base RightIn my-2 border rounded-lg  px-2">
        {/* {auth.isLoggedIn ?
          <div className="">
            <h1 className={`m-2 overflow-scroll scrollbar-hide p-1${LikedCommunityList.length ? "block" : "hidden"}`}>Liked Communities</h1>
            {LikedCommunityList.map((liked) => {
              return <CommunityListCard key={liked} communityName={liked} />
            })}
          </div> : ""} */}

        <h1 className="m-2">All Communities</h1>

        <div className="max-h-[90vh] overflow-scroll scrollbar-hide p-1">
          {communityList.map((liked) => {
            return <CommunityListCard key={liked._id} communityName={liked.name} />
          })}
        </div>
      </div>
    </div>

  );
}

export default Sidebar;
