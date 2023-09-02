import fetch from "node-fetch";
import React, { useState, useEffect } from "react";
import queryString from "query-string";

const Groupme = ({ groups, setGroups }) => {
	const baseURL = "https://api.groupme.com/v3";
	const [accessToken, setAccessToken] = useState("");

	useEffect(() => {
		const parsed = queryString.parse(window.location.search);
		const token = parsed.access_token;
		setAccessToken(token);
	}, []);
	const handleRedirect = () => {
		window.location.href = `${process.env.REACT_APP_GROUPME_OAUTH}`;
	};

	const getGroupChats = async () => {
		const response = await fetch(
			`${baseURL}/groups?access_token=${accessToken}`
		);
		await response.json().then((data) => {
			setGroups(data.response);
		});
	};

	return (
		<div className="flex flex-row justify-evenly w-2/5 m-3">
			<button onClick={handleRedirect}>Auth Groupme</button>
			<button onClick={getGroupChats}>Get Group Chats</button>
		</div>
	);
};
export default Groupme;
