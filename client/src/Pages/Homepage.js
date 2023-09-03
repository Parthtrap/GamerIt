/** @format */

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SERVER_ROOT_URI } from "../config";
import PostListCard from "./Components/PostListCard";
import PostListCardBig from "./Components/PostListCardBig";
import Search from "./Components/Search";

export default function Homepage() {
	const [showModal, setShowModal] = useState(false);
	const [modelImageSrc, setModelImageSrc] = useState("");
	const [PostList, setPostList] = useState([]); // List of Posts to display
	const [togglePostImageMode, setTogglePostImageMode] = useState(false); // Toggle Post Image view

	useEffect(() => {
		// Fething all posts
		const findAllPosts = async () => {
			console.groupCollapsed("HomePage : Fetch All Post Function");
			try {
				let query = `${SERVER_ROOT_URI}/api/post/`;
				const response = await fetch(query);
				const responseData = await response.json();

				console.log("Status : ", response.status);

				if (response.status === 200) {
					console.log("Data : ", responseData);
					setPostList(responseData);
				} else if (response.status === 400) {
					console.log("Error : ", responseData.error);
					toast.error(responseData.error);
				} else {
					console.log("Error : ", responseData);
					toast.error("Error", responseData);
				}
			} catch (err) {
				console.log("Fetch Error : ", err);
				toast.error("Something went wrong. Try again");
			}
			console.groupEnd();
		};

		findAllPosts();
	}, []);

	const searchResults = async (type, value) => {
		console.groupCollapsed("HomePage : Fetch Searched Post Function");
		try {
			let query = `${process.env.REACT_APP_SERVER_ROOT_URI}/api/post/?field=${type}&value=${value}`;
			const response = await fetch(query);
			const responseData = await response.json();

			console.log("Status : ", response.status);

			if (response.status === 200) {
				setPostList(responseData);
			} else if (response.status === 400) {
				console.log("Error : ", responseData.error);
				toast.error(responseData.error);
			} else {
				console.log("Error : ", responseData);
				toast.error("Error", responseData);
			}
		} catch (err) {
			console.log("Fetch Error : ", err);
			toast.error("Something went wrong. Try again");
		}
		console.groupEnd();
	};

	const postImageClick = (img) => {
		setModelImageSrc(img);
		setShowModal(true);
	};

	return (
		<div className="flex flex-col w-full min-h-[91vh] p-5 mt-16 bg-background md:w-3/4">
			{showModal ? (
				<>
					<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
									<button
										className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
											X
										</span>
									</button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<img
										className=" bg-center h-[25vw] rounded-t-lg]"
										src={modelImageSrc}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
			<div className="tofade ">
				<Search onSearch={searchResults} />
			</div>
			<div className="delay-1000 tofade ">
				{/* view toggel */}
				<div className="flex justify-center pt-2">
					<div className="bg-">
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								onChange={() => {
									setTogglePostImageMode(
										!togglePostImageMode
									);
								}}
								type="checkbox"
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-tmuted  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-base"></div>

							<span className="text-tmuted ml-1 text-sm font-medium ">
								Toggle View
							</span>
						</label>
					</div>
				</div>

				{!togglePostImageMode
					? PostList.map((post) => {
							return (
								<PostListCard
									key={post._id}
									post={post}
									imageClick={postImageClick}
								/>
							);
					  })
					: PostList.map((post) => {
							return (
								<PostListCardBig key={post._id} post={post} />
							);
					  })}
			</div>
		</div>
	);
}
