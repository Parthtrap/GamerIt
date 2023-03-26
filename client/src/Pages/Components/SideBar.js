import React, { useContext, useEffect, useRef, useState } from "react";
//import AuthContext from "../Authentication/AuthContext";
import CommunityListCard from "./CommunityListCard";

function Sidebar() {
	const [communityList, setCommunityList] = useState([]);
	const searchRef = useRef(document.createElement("input"));

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

	const searchResults = async (name) => {
		try {
			let query = `${process.env.REACT_APP_SERVER_ROOT_URI}/api/community/search?name=${name}`;
			const response = await fetch(query);

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

	return (
		<div className="text-tprimary hidden p-1 mt-16  bg-background md:block md:w-1/4">
			<div className="border-base RightIn my-2 border rounded-lg  px-2">
				<h1 className="m-2">All Communities</h1>
				
				<div className="relative w-full">
					<input
						// onKeyDown={_handleKeyDown}
						type="search"
						ref={searchRef}
						id="search-dropdown"
						className="bg-fill text-tprimary border-l-base border-background  placeholder-tmuted 
                    block p-2.5 w-full text-sm 
                    rounded-r-lg focus:outline-none   "
						placeholder="Search Mockups, Logos, Design Templates..."
						required=""
					/>

					<button
						onClick={() => {
							console.log(searchRef.current.value);
							searchResults(searchRef.current.value);
						}}
						className="text-tprimary bg-base border-tmuted hover:bg-fill  absolute top-0 right-0 p-2.5 text-sm font-medium  rounded-r-lg border  :outline-none  "
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</div>
				<div className="max-h-[90vh] overflow-scroll scrollbar-hide p-1">
					{communityList.map((community) => {
						return (
							<CommunityListCard
								key={community._id}
								community={community}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
