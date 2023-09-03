/** @format */

import { createContext, useEffect, useState } from "react";

//creating auth-context object
const AuthContext = createContext({
	isLoggedIn: false,
	isFetched: false,
	isAdmin: false,
	followedCommunities: [],
	theme: "default",
	notifications: [],
	userName: null,
	userEmail: null,
	login: (user) => {},
	logout: () => {},
});

//main component containing auth-context object and its functions
export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isFetched, setIsFetched] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [userName, setUserName] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [followedCommunities, setFollowedCommunities] = useState([]);
	const [theme, setTheme] = useState();
	const [notifications, setNotifications] = useState([]);

	const login = (user) => {
		setUserName(user.userName);
		setUserEmail(user.userEmail);
		setIsLoggedIn(true);
		setIsFetched(true);
		setIsAdmin(user.isAdmin);
		setTheme(user.theme);
		setFollowedCommunities(user.followedCommunities);
		setNotifications(user.notifications);
	};

	const logout = async () => {
		try {
			//sending request to server
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/logout`,
				{
					credentials: "include",
				}
			);
			const responseData = await response.json();

			if (response.status === 200) {
				console.log("logged out");
			} else throw Error(responseData.error);
		} catch (err) {
			console.log(err);
			alert("Something went wrong.");
			return;
		}
		setIsLoggedIn(false);
		setUserName(null);
		setUserEmail(null);
		setIsFetched(true);
		if (isAdmin) setIsAdmin(false);
		setNotifications([]);
		setFollowedCommunities([]);
		window.location.replace(`${process.env.REACT_APP_CLIENT_ROOT_URI}`);
	};

	console.groupCollapsed("Auth Context");
	console.log("userName:", userName);
	console.log("userEmail:", userEmail);
	console.log("isLoggedIn:", isLoggedIn);
	console.log("isFetched:", isFetched);
	console.log("isAdmin: ", isAdmin);
	console.groupEnd();
	useEffect(() => {
		const authTokenLogin = async () => {
			console.groupCollapsed("Auth Context : Auth Token Login");
			console.log("Access Token Check API Called");

			//fetch request to verify login/access token
			try {
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_ROOT_URI}/api/auth/tokenLogin`,
					{
						credentials: "include",
					}
				);
				const responseData = await response.json();

				console.log("Status:", response.status);

				if (response.status === 200) {
					console.log("Access Token Verified Successfully!!");
					login(responseData.userData);
				} else if (response.status === 400) {
					console.log("Error : ", responseData.error);
					if (isLoggedIn) {
						alert("Session timeout. Please login again");
						logout();
					}
					if (!isFetched) setIsFetched(true);
				} else {
					console.log("Error : ", responseData.error);
					throw Error(responseData.error);
				}
			} catch (err) {
				console.log("Fetch Error : ", err);
				if (isLoggedIn) {
					alert("Failed to authenticate");
					logout();
				}
				if (!isFetched) setIsFetched(true);
			}
			console.groupEnd();
		};

		authTokenLogin();
		// eslint-disable-next-line
	}, []);

	const context = {
		isLoggedIn: isLoggedIn,
		isFetched: isFetched,
		isAdmin: isAdmin,
		userName: userName,
		userEmail: userEmail,
		theme: theme,
		followedCommunities: followedCommunities,
		notifications: notifications,
		login: login,
		logout: logout,
	};

	//mapping values and providing auth-context access to all its childrens
	return (
		<AuthContext.Provider value={context}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
