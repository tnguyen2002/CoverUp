import fetch from "node-fetch";
import React, { useState, useEffect } from "react";
import queryString from "query-string";

const Groupme = ({ setGroups, auth, setAuth }) => {
	const baseURL = "https://api.groupme.com/v3";
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		const parsed = queryString.parse(window.location.search);
		const token = parsed.access_token;
		console.log("token", token);
		if (token) {
			sessionStorage.setItem("access_token", token);
			setAuth(true);
		}
	}, []);
	const handleRedirect = () => {
		window.location.href = `${process.env.REACT_APP_GROUPME_OAUTH}`;
	};

	const getGroupChats = async () => {
		console.log("access token", sessionStorage.getItem("access_token"));
		if (sessionStorage.getItem("access_token")) {
			const response = await fetch(
				`${baseURL}/groups?access_token=${sessionStorage.getItem(
					"access_token"
				)}`
			);
			await response.json().then((data) => {
				setGroups(data.response);
			});
		} else {
			alert("Please authenticate with Groupme");
		}
	};

	return auth ? (
		<button classname="bg-black font-sans" onClick={getGroupChats}>
			Get Group Chats
		</button>
	) : (
		<button
			className="bg-black font-sans aspect-[4/3]"
			onClick={handleRedirect}
		>
			Auth Groupme
		</button>
	);
};
export default Groupme;
