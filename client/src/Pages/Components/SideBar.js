import React, { useContext, useEffect, useState } from "react";
//import AuthContext from "../Authentication/AuthContext";
import CommunityListCard from "./CommunityListCard";

function Sidebar() {

    const [communityList, setCommunityList] = useState([]);

    //fetching all communities
    useEffect(() => {
        const findAllCommunities = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_SERVER_ROOT_URI}/api/community/`
            );
    
            console.log(response.status);
    
            const responseData = await response.json();
    
            if (response.status === 200) {
              setCommunityList(responseData);
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
    
        findAllCommunities();
      }, []);

  return (

    <div className="text-tprimary hidden p-1 mt-16  bg-background md:block md:w-1/4">
      <div className="border-base RightIn my-2 border rounded-lg  px-2">

        <h1 className="m-2">All Communities</h1>

        <div className="max-h-[90vh] overflow-scroll scrollbar-hide p-1">
          {communityList.map((community) => {
            return <CommunityListCard key={community._id} community={community} />
          })}
        </div>
      </div>
    </div>

  );
}

export default Sidebar;
