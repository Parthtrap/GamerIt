import React, {useState, useRef} from "react";
import { Link } from "react-router-dom";

export default function Commentitem(prop) {

    const [likestates, setLikestates] = useState(false);
    const Liked = ()=>{
        setLikestates(!likestates)
        console.log("bhiya like wala add kardo idhar, commont ko like kiya ha ");
    }

    const [replystate, setReplystate] = useState(false);
    const Replyclick = (e)=>{
        e.preventDefault();
        setReplystate(!replystate)
    }

    const replyRef = useRef(document.createElement("input"));

    const _handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const replystring = replyRef.current.value;
        }
    };

    const onReply = (e)=>{
        e.preventDefault();
        // reply aad ho gaya bhiya idhar kya kar rahe ho
        console.log(replyRef.current.value);
    }

    
   
    return (
        <div className="bg-gray-600 border-slate-500 hover:border-slate-200 px-4 py-2 my-1 rounded-lg border-b  hover:border hover:drop-shadow-[0_4px_3px_rgba(255,255,255,0.25)] ">

            <div className="items-center">
                <div className="flex items-center ">
                    <Link to={"/profile/" + prop.obj.userId}>
                        <div className="text-tprimary ">
                            <span className="font-bold cursor-pointer ">{prop.obj.userId}</span>{' '}
                        </div>
                    </Link>
                </div>
                {prop.obj.text}
            </div>
            <div className=" flex">
                {/* like button */}
                <button
                    onClick={Liked}
                    className="flex items-center justify-center focus:outline-none rounded-full p-1 hover:bg-fill "
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={likestates ? "white" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                    </svg>
                </button>

                <button
                    onClick={Replyclick}
                    className="flex items-center justify-center focus:outline-none rounded-full hover:bg-fill p-1 mx-1"
                >
                    Reply
                </button>

            </div>

            {/* input field for reply */}
            <div className="relative flex my-4">
                {/*reply input field*/}
                <input
                    onKeyDown={_handleKeyDown}
                    ref={replyRef}
                    className="bg-base text-tprimary w-full px-4 py-3  placeholder-tmuted rounded-lg  focus:outline-none"
                    placeholder="Write something to Roland…"
                />

                {/*reply button */}
                <button
                    onClick={onReply}
                    className=" bg-fill border-tmuted hover:bg-base text-tprimary absolute top-0 right-0 
                        p-2.5 
                        text-sm font-medium  
                        rounded-r-lg border  focus:outline-none "
                >
                    <svg
                    aria-hidden="true"
                    className="w-[1.6rem] h-[1.6rem]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                    </svg>
                </button>
                </div>


        </div>

    );
}
