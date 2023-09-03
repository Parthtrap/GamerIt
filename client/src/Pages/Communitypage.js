/** @format */

import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import PostListCard from "./Components/PostListCard";
import PostListCardBig from "./Components/PostListCardBig";
import NewMyModal from "./Components/NewRequestmodel";
import CreatePostSearchBar from "./Components/CreatePostSearchBar";
import { storage } from "./../Helper/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function Communitypage() {
  const auth = useContext(AuthContext);

  const [communityDetails, setCommunityDetails] = useState({
    followerCount: 0,
    profilePic: "Loading...",
    name: "Loading...",
  });
  const [CommunityPostList, setCommunityPostList] = useState([]);

  const [toggle, setToggle] = useState(false);
  const [request, setRequest] = useState(false);
  const [isModerator, setisModerator] = useState(false);
  const [reload, setReload] = useState(false);

  function onClose() {
    setRequest(false);
  }
  const communityName = useParams().name;

  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const findCommunityDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/community/?name=${communityName}`
        );

        console.log(response.status);

        const responseData = await response.json();

        if (response.status === 200) {
          console.log(responseData);
          const checkModerator = responseData.moderators.filter((user) => {
            return user == auth.userName;
          });

          if (checkModerator.length) setisModerator(true);
          setCommunityDetails(responseData);
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

    const findCommunityPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ROOT_URI}/api/post/community?name=${communityName}`
        );

        console.log(response.status);

        const responseData = await response.json();

        if (response.status === 200) {
          console.log(responseData);
          setCommunityPostList(responseData);
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
    findCommunityDetails();
    findCommunityPosts();
  }, [communityName, reload]);

  const uploadFiles = async (file) => {

    try {
      if (!file) throw Error("file not found");
      const storageRef = ref(storage, `/files/${file.name}`);
      console.log(file, storageRef);

      const uploadTask = await uploadBytesResumable(storageRef, file);

      console.log(uploadTask);

      // uploadTask.on("state_changed", (snapshot) => {
			//   console.log(snapshot);
			//   const prog = Math.round(
			//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			//   );
			//   setProgress(prog);
			// });

			const url = await getDownloadURL(uploadTask.ref);
			console.log("image uploaded");
			console.log(url);
			return url;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const displayFile = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    console.log(file);
    setProfilePic(file);
  };

  const setProfilePic = async (file) => {
    if (file.size > 10485760 / 10) {
      toast.error("File size should be less then 2.5 MB");
      return;
    }
    const fileUrl = await toast.promise(uploadFiles(file),{
      pending: "Uploading...",
      success: "Uploaded 👌",
      error: "Failed to upload image. Try again",
    });
    console.log(fileUrl);
    if (!fileUrl) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ROOT_URI}/api/community/profilepic`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: communityName,
            profilepic: fileUrl,
          }),
        }
      );

      const responseData = await response.json();
      if (response.status === 200) {
        toast.success("Updated profile pic");
        setReload(!reload);
      } else {
        console.log(responseData.message);
        fileInputRef.current.value = null;
        alert("Someting went wrong. Try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to connect to the server");
    }
  };

  return (
    <div className="bg-background w-full min-h-[41rem] mt-16">
      <div className="bg-fill flex flex-col gap-2 p-10 md:m-16 tofade w-10%">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div />
            <label htmlFor="profilePic">
              <img
                className="w-20 h-20 rounded-full "
                src={communityDetails.profilePic}
              />
            </label>
            {isModerator ? (
                <>
                  <input
                    id="profilePic"
                    type="file"
                    ref={fileInputRef}
                    onChange={displayFile}
                    className="hidden"
                    accept="image/*"
                  />
                </>
              ) : (
                <></>
              )}

            <div className=" text-4xl font-medium ">
              <div className="text-tprimary">{communityDetails.name}</div>
            </div>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => setRequest(true)}
              className="flex gap-2 bg-base hover:bg-background
                      focus:outline-none focus:ring-2 
                      focus:ring-tmuted
                      font-medium rounded-full t
                      ext-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Find People
            </button>
          </div>
        </div>

        {/*random text in the profile*/}
        <div>
          <div className={`text-tprimary font-medium text-lg `}>
            <p className="text-tmuted">
              Followers : {communityDetails.followerCount}
            </p>
            <p className="text-tmuted">Posts: {CommunityPostList.length}</p>
          </div>
        </div>
      </div>

      {/*list of all posts posted*/}
      <div className="bg-fill flex flex-col gap-6 p-10 md:m-16 tofade w-10%">
        <div className="text-tprimary text-5xl font-bold text-center ">
          Posts
        </div>

        {/* view toggel */}
        <div className="mx-auto">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              onChange={() => {
                setToggle(!toggle);
              }}
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-tmuted  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-base"></div>
            
            <span class="text-tmuted ml-1 text-sm font-medium ">
              Toggle View
            </span>
          </label>
        </div>

        <div className="mt-6">
          <CreatePostSearchBar />
          <div>
            {toggle
              ? CommunityPostList.map((post) => {
                  return <PostListCard key={post._id} post={post} />;
                })
              : CommunityPostList.map((post) => {
                  return <PostListCardBig key={post._id} post={post} />;
                })}
          </div>
        </div>

        {request ? <NewMyModal onClose={onClose} community={communityDetails} /> : <></>}
      </div>
    </div>
  );
}

export default Communitypage;
