import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from "react";
//import defalt_pfp from "./../../Assets/default_pfp.png"
import Commentitem from "./Components/Commentitem";
import { Link } from "react-router-dom";
//import AuthContext from "../Authentication/AuthContext";
import { toast } from "react-toastify";

export default function Postpage() {

  const params = useParams();
  //const auth = useContext(AuthContext);
  const auth = {}
  const postID = params.id;
  const [postDetails, setPostDetails] = useState({
    title: 'Loading...',
    content: 'Loading... ',
    likes: 0,
    comments: [],
    postingtime: "2022-11-10T06:10:35.656Z",
    community: 'Loading...',
    ownerId: 'Loading...',
    ownerUserName: 'Loading...'
  })

  const commentRef = useRef(document.createElement("input"));
  const [a, setA] = useState();

  const [likestates, setLikestates] = useState(false);

  async function Liking() {
    const query = JSON.stringify({ email: auth.userEmail, postid: postID });
    try {
      const response = await fetch(
        "http://localhost:5000/api/post/like",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: query,
        }
      );
      const responseData = await response.json();
    } catch (err) {
      toast.error("Unable to connect to the server");
    }
  }
  async function UnLiking() {
    const query = JSON.stringify({ email: auth.userEmail, postid: postID });
    try {
      const response = await fetch(
        "http://localhost:5000/api/post/unlike",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: query,
        }
      );
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

    if (likestates)
      UnLiking();
    else
      Liking();
    setLikestates(!likestates)
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const commentstring = commentRef.current.value
    }
  }

  async function Commenting(commentstring) {
    const searchQuery = JSON.stringify({
      commenter: auth.userEmail,
      comment: commentstring,
      postid: postDetails._id
    });
    try {
      const response = await fetch(
        "http://localhost:5000/api/post/comment",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: searchQuery,
        }
      );
      const responseData = await response.json();
      if (response.status === 500) {

      }
      else if (response.status === 404) {

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
    const commentstring = commentRef.current.value
    await Commenting(commentstring);
    setA(a + 1);
  }

  useEffect(() => {
    const UpdateUser = async () => {
      const searchQuery = JSON.stringify({ "email": auth.userEmail })
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/get",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: searchQuery,
          }
        );

        const responseData = await response.json();
        if (response.status === 201) {
          if (responseData.likedposts.find((e) => { return e === params.id }) === undefined) {
            setLikestates(false)
          }
          else {
            setLikestates(true);
          }
        } else {
          console.log(responseData.message);
        }
      } catch (err) {
        toast.error("Unable to connect to the server");
        console.log(err.message);
      }
    }
    if (auth.isLoggedIn)
      UpdateUser();

    const fetchPost = async () => {
      const searchQuery = JSON.stringify({
        id: params.id
      });
      try {
        const response = await fetch(
          "http://localhost:5000/api/post/get",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: searchQuery,
          }
        );

        const responseData = await response.json();

        if (response.status === 500) {

        }
        else if (response.status === 404) {
          setPostDetails({
            title: 'No user Found',
            content: 'No User No Content',
            likes: -100,
            comments: [],
            postingtime: "2022-11-10T06:10:35.656Z",
            community: 'Unknown',
            ownerId: 'NoUser@NULL.404',
            ownerUserName: 'Error 404'
          })
        }
        if (response.status === 201) {
          setPostDetails(responseData);
        } else {
          console.log(responseData.message);
        }
      } catch (err) {
        toast.error("Unable to connect to the server");
        console.log(err.message);
      }
    }
    fetchPost();
  }, [params, a])

  return (
    <div className="bg-background flex justify-center w-full min-h-[91vh] mt-16 ">
      <div className="bg-fill w-full p-8 m-12 rounded-lg tofade md:max-w-2xl shadow-fb">

        {/* reddit name and posted by and like button */}
        <div className="outline-tmuted flex items-center gap-3 pl-1 rounded-lg outline outline-1 outline-offset-4 ">

          {/* like button */}
          <button
            onClick={Liked}
            className="flex items-center justify-center focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill={likestates ? "purple" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
          </button>

          {/* rest of the stuff */}
          <div className="flex items-center">

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTMKlDer2xwqMhyeL9tvVQ-Fn33XV1hdL0DUrvBr6nWw&s"
              alt="img"
              className="w-10 h-10 rounded-full"
            />

            <div className="ml-4 text-white">

              <Link to={"/community/" + postDetails.community}>
                <span className="font-bold text-white cursor-pointer">r/{postDetails.community}</span>{' '}</Link>
              Posted by {' '}

              <Link to={"/profile/" + postDetails.ownerId}>
                <span className="text-white ">u/{postDetails.ownerUserName}</span>{' '}
              </Link>
              <br />

              <span className="text-sm text-white text-opacity-50 text-fGrey">
                {postDetails.postingtime}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 text-white aspect-auto">
          {postDetails.title}
        </div>

        <div className="w-full mt-4 text-white aspect-auto">
          {postDetails.content}
        </div>

        <div className="flex items-center justify-between mt-4 text-white text-opacity-50 text-fGrey">
          <div>{postDetails.likes} Likes</div>
          <div>{postDetails.comments.length} Comments</div>
        </div>

        {auth.isLoggedIn ?
          <div className="relative flex my-4">

            {/*commont input field*/}
            <input
              onKeyDown={_handleKeyDown}
              ref={commentRef}
              className="w-full px-4 py-3 text-white placeholder-gray-400 rounded-lg bg-gr focus:outline-none"
              placeholder="Write something to Roland…"
            />

            {/*commont button*/}
            <button onClick={onComment}
              className="absolute top-0 right-0 
          p-2.5 
          text-sm font-medium text-white 
          rounded-r-lg border border-pur focus:outline-none bg-pur hover:bg-hovpur ">
              <svg
                aria-hidden="true"
                className="w-[1.6rem] h-[1.6rem]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </button>
          </div>
          :
          <div className="w-full h-[1px] mt-4 bg-pur"></div>
        }

        {/* commnments */}
        {postDetails.comments.map((c, i) => {
          return < Commentitem key={i} commenter={c.commenter} comment={c.comment} />
        })}
      </div>
    </div>);
}

