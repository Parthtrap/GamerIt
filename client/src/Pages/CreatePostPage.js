/** @format */

import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import { storage } from "./../Helper/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import CreatePostTag from "./Components/CreatePostTag";

function CreatePostPage() {
	const [communityList, setCommunityList] = useState([]);
	const [selectedCommunity, setSelectedCommunity] = useState({ tags: [] });
	const [inputValue, setInputValue] = useState("");
	const [fileInputValue, setFileInputValue] = useState(null);
	const [open, setOpen] = useState(false);
	const [userInfo, setUserInfo] = useState({ username: "" });
	const [postTags, setPostTags] = useState([]);
	const titleRef = useRef(document.createElement("input"));
	const contentRef = useRef(document.createElement("input"));
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const fileInputRef = useRef();

	const [progress, setProgress] = useState(0);

	const uploadFiles = async (file) => {
		if (!file) return;

		try {
			const storageRef = ref(storage, `/files/${file.name}`);
			console.log(file, storageRef);

			const uploadTask = uploadBytesResumable(storageRef, file);

			console.log(uploadTask);

			// uploadTask.on("state_changed", (snapshot) => {
			//   console.log(snapshot);
			//   const prog = Math.round(
			//     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			//   );
			//   setProgress(prog);
			// });

			const url = await getDownloadURL(uploadTask.snapshot.ref);
			console.log("file uploaded");
			console.log(url);
			return url;
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	async function onPostSubmit(e) {
		e.preventDefault();
		const title = titleRef.current.value;
		const content = contentRef.current.value;

		if (title === "" || content === "") {
			toast.error("Please Fill all the Fields");
		} else if (selectedCommunity.name == null) {
			toast.error("Please Select a Community");
		} else {
			try {
				let fileUrl, type;
				fileUrl = "";
				type = "";
				if (fileInputValue) {
					if (fileInputValue.file.size > 10485760) {
						toast.error("File size should be less then 10 MB");
						return;
					}
					fileUrl = await uploadFiles(fileInputValue.file);
					if (!fileUrl) {
						toast.error("Failed to upload file. Try again");
						return;
					}
					type = fileInputValue.type;
				}
				const postData = JSON.stringify({
					username: auth.userName,
					title: title,
					content: content,
					fileSrc: fileUrl,
					type,
					community: selectedCommunity.name,
					tags: postTags,
				});
				console.log("here");
				console.log(postData);

				const response = await fetch(
					`${process.env.REACT_APP_SERVER_ROOT_URI}/api/post`,
					{
						method: "POST",
						headers: {
							"Content-type": "application/json",
						},
						body: postData,
					}
				);

				const responseData = await response.json();

				// Email Password Matches => Login
				if (response.status === 200) {
					toast.success("Post Made Successfully", { theme: "dark" });
					navigate("/");
				} else {
					console.log(responseData.message);
					alert("Someting went wrong. Try again.");
				}
			} catch (err) {
				toast.error("Unable to connect to the server");
				console.log(err);
				return;
			}
		}
	}

	const onTagSelect = async (e) => {
		setPostTags([e, ...postTags]);
		console.log(postTags);
	};
	const onTagRemove = async (e) => {
		setPostTags(postTags.filter((item) => item !== e));
		console.log(postTags);
	};

	const displayFile = async (e) => {
		e.preventDefault();
		const file = fileInputRef.current.files[0];
		const type = file.type.split("/")[0];
		const fileObj = {
			file,
			url: window.URL.createObjectURL(file),
			type,
		};
		setFileInputValue(fileObj);
	};

	useEffect(() => {
		const fetchCommunites = async () => {
			console.log("here");
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_ROOT_URI}/api/community`
				);
				const responseData = await response.json();
				console.log(response.status);
				if (response.status === 500) {
					console.log(responseData.message);
					return;
				} else if (response.status === 200) {
					console.log(responseData);
					setCommunityList(responseData);
					return;
				} else {
					console.log(responseData.message);
					return;
				}
			} catch (err) {
				console.log(err.message);
				toast.error("Unable to connect to the server");
				return;
			}
		};
		const getUserInfo = async () => {
			console.log("here 2");
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_ROOT_URI}/api/user?username=${auth.userName}`,
					{
						credentials: "include",
					}
				);
				const responseData = await response.json();
				if (response.status === 500) {
					console.log(responseData.message);
				} else if (response.status === 400) {
					alert(responseData.message);
					return;
				}
				if (response.status === 200) {
					setUserInfo(responseData);
					return;
				} else {
					console.log(responseData.error);
					return;
				}
			} catch (err) {
				toast.error("Unable to connect to the server");
				console.log(err.message);
				return;
			}
		};
		fetchCommunites();
		getUserInfo();

		// setCommunityList(CommList);
	}, []);

	return (
		<div className=" p-6 pt-16 min-h-[100vh] bg-black grow ">
			<div className="container mx-auto tofade md:max-w-2xl">
				{/* Heading */}
				<div className="">
					<h1 className="p-2 text-2xl font-bold text-center text-gray-300">
						Create a post
					</h1>
				</div>

				{/* Input Form */}
				<div className="p-4 pb-2 mt-1 rounded-lg bg-divcol">
					<form>
						{/* Title Input */}
						<div>
							<input
								required=""
								ref={titleRef}
								className="w-full px-4 py-3 mb-2 text-purple-100 rounded focus:outline focus:outline-white bg-gr "
								placeholder="Title"
							/>
						</div>

						<div className="w-full mb-4 rounded-lg bg-divcol ">
							<textarea
								required=""
								ref={contentRef}
								className="w-full px-4 py-3 mb-2 text-sm text-purple-100 rounded resize-y focus:outline focus:outline-white bg-gr "
								placeholder="Write  comment..."
								rows="4"
							/>
							{/* add the dreop down here */}
							<div className="mt-4 font-medium w-full  ">
								<div
									onClick={() => setOpen(!open)}
									className={`bg-gr w-full p-2 flex items-center justify-between text-purple-100 rounded ${
										!selectedCommunity && "text-purple-100 "
									}`}
								>
									<div className="flex items-center text-gray-400 ">
										<img
											className="object-cover w-10 h-10 mr-2 rounded-full"
											src={selectedCommunity.imgsrc}
										/>
										{selectedCommunity.name
											? selectedCommunity.name.length > 25
												? selectedCommunity.name.substring(
														0,
														25
												  ) + "..."
												: selectedCommunity.name
											: "Select Communtiy"}
									</div>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 rotate-180 "
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 15.75l7.5-7.5 7.5 7.5"
										/>
									</svg>
								</div>

								<ul
									className={`bg-gr mt-2 outline-white overflow-y-auto ${
										open
											? "max-h-60 outline outline-1"
											: "max-h-0"
									} `}
								>
									<div className="sticky top-0 flex items-center px-2 shadow bg-gr">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="gray"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
											/>
										</svg>
										<input
											type="text"
											value={inputValue}
											onChange={(e) =>
												setInputValue(
													e.target.value.toLowerCase()
												)
											}
											placeholder="Enter community name"
											className="p-2 text-gray-400 outline-none placeholder:text-gray-400 bg-gr"
										/>
									</div>
									{communityList.map((community) => {
										return (
											<div key={community._id}>
												<li
													className={`p-2 text-sm text-white hover:bg-purple-800 
                                        ${
											community.name?.toLowerCase() ===
												selectedCommunity.name?.toLowerCase() &&
											"bg-purple-600 text-white"
										}
                                        ${
											community.name
												?.toLowerCase()
												.startsWith(inputValue)
												? "block"
												: "hidden"
										}`}
													onClick={() => {
														if (
															community.name?.toLowerCase() !==
															selectedCommunity.name?.toLowerCase()
														) {
															setSelectedCommunity(
																community
															);
															setOpen(false);
															setInputValue("");
														}
													}}
												>
													<div className="flex items-center">
														<img
															className="object-cover w-10 h-10 mr-2 rounded-full"
															src={
																community?.profilePic
															}
														></img>
														{community?.name}
													</div>
												</li>
												;
											</div>
										);
									})}
								</ul>
							</div>
							{fileInputValue === null ? (
								<></>
							) : fileInputValue.type === "image" ? (
								<>
									<img src={fileInputValue.url} />
								</>
							) : (
								<>
									{console.log(fileInputValue.type)}
									<video src={fileInputValue.url} />
								</>
							)}

							{selectedCommunity ? (
								<div className="flex gap-3 my-4">
									{selectedCommunity.tags.map((tag) => {
										return (
											<CreatePostTag
												key={tag._id}
												tag={tag}
												onSelect={onTagSelect}
												onRemove={onTagRemove}
											/>
										);
									})}
								</div>
							) : (
								""
							)}

							{/* bottom row*/}
							<div className="flex items-center justify-between px-3 py-2 border-t border-gray-600 bg-divcol">
								{/*post comment buttton*/}
								<button
									type="submit"
									onClick={onPostSubmit}
									className="inline-flex items-center 
                                py-2.5 px-4 
                                text-xs font-medium text-center text-white
                                rounded-lg 
                                bg-pur
                                focus:ring-4 focus:ring-purple-900 
                                hover:bg-hovpur"
								>
									Submit Post
								</button>

								{/*add atachment button*/}
								<div className="flex pl-0 space-x-1 sm:pl-2">
									<input
										type="file"
										className="hidden"
										required
									/>
									<input
										id="fileInput"
										type="file"
										ref={fileInputRef}
										onChange={displayFile}
										className="hidden"
										accept="video/*,video/x-matroska,image/*"
									/>
									<label
										htmlFor="fileInput"
										className="inline-flex justify-center p-2 text-gray-400 rounded cursor-pointer hover:text-white hover:bg-pur"
									>
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 
                                        0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
												clipRule="evenodd"
											></path>
										</svg>
									</label>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreatePostPage;
