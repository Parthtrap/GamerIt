/** @format */

import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from "react";
//import defalt_pfp from "./../../Assets/default_pfp.png"
import Commentitem from "./Components/Commentitem";
import { Link } from "react-router-dom";
//import AuthContext from "../Authentication/AuthContext";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

export default function Postpage() {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const postID = params.id;
  const [postDetails, setPostDetails] = useState({
    title: "Loading...",
    content: "Loading... ",
    likes: 0,
    comments: [],
    postingtime: "2022-11-10T06:10:35.656Z",
    community: "Loading...",
    ownerId: "Loading...",
    ownerUserName: "Loading...",
  });

  const commentRef = useRef(document.createElement("input"));
  const [a, setA] = useState();

  const [likestates, setLikestates] = useState(false);

  async function Liking() {
    const query = JSON.stringify({ email: auth.userEmail, postid: postID });
    try {
      const response = await fetch("http://localhost:5000/api/post/like", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: query,
      });
      const responseData = await response.json();
    } catch (err) {
      toast.error("Unable to connect to the server");
    }
  }
  async function UnLiking() {
    const query = JSON.stringify({ email: auth.userEmail, postid: postID });
    try {
      const response = await fetch("http://localhost:5000/api/post/unlike", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: query,
      });
      const responseData = await response.json();
    } catch (err) {
      toast.error("Unable to connect to the server");
    }
  }

  const Liked = (e) => {
    e.preventDefault();
    if (!auth.isLoggedIn) {
      toast.error("Please login first");
      return;
    }

    if (likestates) UnLiking();
    else Liking();
    setLikestates(!likestates);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const commentstring = commentRef.current.value;
    }
  };

  async function Commenting(commentstring) {
    const searchQuery = JSON.stringify({
      commenter: auth.userEmail,
      comment: commentstring,
      postid: postDetails._id,
    });
    try {
      const response = await fetch("http://localhost:5000/api/post/comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: searchQuery,
      });
      const responseData = await response.json();
      if (response.status === 500) {
      } else if (response.status === 404) {
      }
      if (response.status === 201) {
      } else {
        console.log(responseData.message);
      }
    } catch (err) {
      toast.error("Unable to connect to the server");
      console.log(err.message);
    }
  }

  const onComment = async (e) => {
    e.preventDefault();
    const commentstring = commentRef.current.value;
    await Commenting(commentstring);
    setA(a + 1);
  };

  useEffect(() => {
    const UpdateUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/user/?username=${auth.userName}`
        );

        const responseData = await response.json();
        if (response.status === 201) {
          if (
            responseData.likedposts.find((e) => {
              return e === params.id;
            }) === undefined
          ) {
            setLikestates(false);
          } else {
            setLikestates(true);
          }
        } else {
          console.log(responseData.message);
        }
      } catch (err) {
        toast.error("Unable to connect to the server");
        console.log(err.message);
      }
    };
    if (auth.isLoggedIn) UpdateUser();

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/post/id?postId=${postID}`
        );

        const responseData = await response.json();

        if (response.status === 500) {
        } else if (response.status === 400) {
          alert(responseData.message);
          navigate("/");
          return;
        }
        if (response.status === 200) {
          setPostDetails({
            title: responseData.title,
            content: responseData.content,
            likes: responseData.likeUsers.length,
            comments: responseData.comments,
            postingtime: responseData.createdAt,
            community: responseData.community,
            ownerUserName: responseData.username,
          });
          return;
        } else {
          console.log(responseData.message);
          alert("Unable to connect");
          navigate("/");
          return;
        }
      } catch (err) {
        toast.error("Unable to connect to the server");
        console.log(err.message);
      }
    };
    fetchPost();
  }, [params, a]);
  const [commentsss, setCommentsss] = useState({
    text: "Main Comment",
    comments: [
      {
        text: "Sub Comment 1",
        comments: [
          { text: "Sub Sub Comment 1", comments: [] },
          { text: "Sub Sub Comment 2", comments: [] },
        ],
      },
      {
        text: "Sub Comment 2",
        comments: [
          { text: "Sub Sub Comment 1", comments: [] },
          { text: "Sub Sub Comment 2", comments: [] },
          { text: "Sub Sub Comment 3", comments: [] },
          { text: "Sub Sub Comment 4", comments: [] },
        ],
      },
      {
        text: "Sub Comment 3",
        comments: [
          { text: "Sub Sub Comment 1", comments: [] },
          { text: "Sub Sub Comment 2", comments: [] },
          { text: "Sub Sub Comment 3", comments: [] },
        ],
      },
    ],
  });

  const [commentsssss, setCommentsssss] = useState([
    {
      userId: "Parthtrap",
      text: "Main Comment",
      likes: ["kitashi", "Ora Ora", "Ritik"],
      isDeleted: false,
      createdAt: "9/9/29",
      replies: [
        {
          userId: "kitashi",
          text: "Sub Comment",
          likes: ["Parthtrap", "Ritik"],
          isDeleted: false,
          createdAt: "9/9/29",
          replies: [
            {
              userId: "Parthtrap",
              text: "Main Comment",
              likes: ["kitashi", "Ora Ora", "Ritik"],
              isDeleted: true,
              createdAt: "9/9/29",
              replies: [],
            },
          ],
        },
        {
          userId: "Parthtrap",
          text: "Subb Comment",
          likes: ["Ora Ora", "Ritik"],
          isDeleted: false,
          createdAt: "9/9/29",
          replies: [],
        },
      ],
    },
    {
      userId: "kitashi",
      text: "Main Comment2",
      likes: ["kitashi"],
      isDeleted: false,
      createdAt: "9/9/29",
      replies: [],
    },
    {
      userId: "Gaurav",
      text: "Main Comment3",
      likes: ["Ora Ora", "Ritik"],
      isDeleted: true,
      createdAt: "9/9/29",
      replies: [],
    },
    {
      userId: "Ora Ora",
      text: "Main Comment4",
      likes: ["Ritik"],
      isDeleted: false,
      createdAt: "9/9/29",
      replies: [],
    },
  ]);

  function CommentChainBuilder(obj, layer) {
    // console.log(obj, layer);
    let mystyle = {
      "padding-left": 30 * layer + "px",
    };

    console.log(obj);
    return (
      <>
        <div style={mystyle} className={`text-tprimary `}>
          <Commentitem obj={obj} />
        </div>

        {obj.replies.map((c) => {
          return CommentChainBuilder(c, layer + 1);
        })}
      </>
    );
  }
  return (
    <div className="bg-background flex justify-center w-full min-h-[91vh] mt-16 ">
      <div className="bg-fill w-full p-8 m-12 rounded-lg tofade md:max-w-2xl shadow-fb">
        {/* reddit name and posted by and like button */}
        <div className="outline-tmuted flex items-center gap-3 pl-1 rounded-lg outline outline-1 outline-offset-4 ">
          {/* like button */}
          <button
            onClick={Liked}
            className="flex items-center justify-center focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={likestates ? "purple" : "none"}
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

          {/* rest of the stuff */}
          <div className="flex items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTMKlDer2xwqMhyeL9tvVQ-Fn33XV1hdL0DUrvBr6nWw&s"
              alt="img"
              className="w-10 h-10 rounded-full"
            />

            <div className="text-tprimary ml-4">
              <Link to={"/community/" + postDetails.community}>
                <span className="text-tprimary font-bold  cursor-pointer">
                  r/{postDetails.community}
                </span>{" "}
              </Link>
              Posted by{" "}
              <Link to={"/profile/" + postDetails.ownerUserName}>
                <span className="text-tprimary ">
                  u/{postDetails.ownerUserName}
                </span>{" "}
              </Link>
              <br />
              <span className="text-tprimary text-sm text-opacity-50 text-fGrey">
                {postDetails.postingtime}
              </span>
            </div>
          </div>
        </div>

        <div className="text-tprimary w-full mt-4  aspect-auto">
          {postDetails.title}
        </div>

        <div className="text-tprimary w-full mt-4  aspect-auto">
          {postDetails.content}
        </div>

        <div className="text-tprimary flex items-center justify-between mt-4 text-opacity-50 text-fGrey">
          <div>{postDetails.likes} Likes</div>
          <div>{postDetails.comments.length} Comments</div>
        </div>

        {/* {auth.isLoggedIn ?    RISHAV ADD A CHECK FOR ISLOGED IN OR NOT   ------------------------------------------------------------------------------ */}
        <div className="relative flex my-4">
          {/*commont input field*/}
          <input
            onKeyDown={_handleKeyDown}
            ref={commentRef}
            className="bg-base text-tprimary w-full px-4 py-3  placeholder-tmuted rounded-lg  focus:outline-none"
            placeholder="Write something to Roland…"
          />

          {/*commont button */}
          <button
            onClick={onComment}
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

        <div className="bg-tmuted w-full h-[1px] mt-4 "></div>

        {commentsssss.map((ee) => {
          return (
            <div className="flex flex-col gap-0 ">
              {CommentChainBuilder(ee, 0)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
