import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CommunityListCard(props) {
    const navigate = useNavigate();
    const openCommunityButtonHandler = async ()=>{
        navigate(`/community/${props.community.name}`);
    }
    return (
            <div onClick={openCommunityButtonHandler} className="flex items-center p-3 my-4 rounded-xl bg-fill outline outline-1 outline-neutral-600 hover:outline hover:outline-1 hover:outline-white">

                {/*image*/}
                <div>
                    <img className="object-cover w-10 h-10 rounded-full"
                        src={props.community.profilePic} />
                </div>

                {/*name and member count*/}
                <div className="mx-2">
                    <div className="text-tprimary">
                        g/{props.community.name}
                    </div>
                    <div className="text-tmuted ">{props.community.followerCount} members</div>
                </div>

            </div>
    );
}