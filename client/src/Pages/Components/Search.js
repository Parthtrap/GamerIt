import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Search({ onSearch }) {
	const [dropdown, setDropdown] = useState(false);
	const [type, setType] = useState("post");
	const searchRef = useRef(document.createElement("input"));

	return (
		<div className="flex">
			<div className="relative">
				{/*flter selector button*/}
				<button
					className={`bg-fill text-tprimary
                flex items-center justify-between py-2.5 px-4 w-40 mr-[0.05rem]
                text-sm font-medium text-center 
                outline outline-1 outline-base
                ${dropdown ? "rounded-tl-lg " : "rounded-l-lg hover:bg-base"} `}
					onClick={(e) => {
						e.preventDefault();
						setDropdown(!dropdown);
					}}
				>
					{type}

					<svg
						aria-hidden="true"
						className="w-4 h-4 ml-1"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				{/* option to choose from, droupdown interface */}
				<div
					className={`z-10 w-40
                absolute top-10 left-0
                rounded-b-lg
                shadow
                bg-fill 
                ${dropdown ? "block" : "hidden"}`}
				>
					<ul className="text-tprimary py-1 text-sm ">
						<li>
							<button
								className="hover:bg-base inline-flex w-full px-4 py-2  "
								onClick={(e) => {
									e.preventDefault();
									setType("community");
									setDropdown(false);
								}}
							>
								Community
							</button>
						</li>

						<li>
							<button
								onClick={(e) => {
									e.preventDefault();
									setType("post");
									setDropdown(false);
								}}
								className="hover:bg-base inline-flex w-full px-4 py-2 rounded-b-lg  "
							>
								Post
							</button>
						</li>
					</ul>
				</div>
			</div>

			{/*search box input and button*/}
			<div className="relative w-full">
				<input
					// onKeyDown={_handleKeyDown}
					type="search"
					ref={searchRef}
					id="search-dropdown"
					className="bg-fill text-tprimary border-l-base border-background  placeholder-tmuted 
                    block p-2.5 w-full z-20 text-sm 
                    rounded-r-lg focus:outline-none   "
					placeholder="Search Mockups, Logos, Design Templates..."
					required=""
				/>

				<button
					onClick={() => {
						console.log(type, searchRef.current.value);
						onSearch(type, searchRef.current.value);
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
		</div>
	);
}
