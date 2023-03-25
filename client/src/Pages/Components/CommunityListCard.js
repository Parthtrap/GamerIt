import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CommunityListCard(props) {
    const [communityDetails, setCommunityDetails] = useState({
        followers: 0,
        imgsrc: "Loading...",
        name: "Loading...",
        tagline: "Loading...",
    });

    return (
        <Link to={"/community/" + communityDetails.name}>
            <div className="flex items-center p-3 my-4 rounded-xl bg-fill outline outline-1 outline-neutral-600 hover:outline hover:outline-1 hover:outline-white">

                {/*image*/}
                <div>
                    <img className="object-cover w-10 h-10 rounded-full"
                        src={communityDetails.imgsrc} />
                </div>

                {/*name and member count*/}
                <div className="mx-2">
                    <div className="text-tprimary">
                        g/{communityDetails.name}
                    </div>
                    <div className="text-tmuted ">{communityDetails.followers} members</div>
                </div>

            </div>
        </Link>
    );
}