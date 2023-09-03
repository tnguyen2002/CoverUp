import fetch from "node-fetch";
import React, { useState, useEffect } from "react";
import queryString from "query-string";

const Groupme = ({ setGroups, auth, setAuth }) => {
	const baseURL = "https://api.groupme.com/v3";
	const [retrieved, setRetrieved] = useState(false);

	useEffect(() => {
		const parsed = queryString.parse(window.location.search);
		const token = parsed.access_token;
		if (token) {
			sessionStorage.setItem("access_token", token);
			setAuth(true);
			getGroupChats();
			setRetrieved(true);
		}
	}, []);
	const handleRedirect = () => {
		window.location.href = `${process.env.REACT_APP_GROUPME_OAUTH}`;
	};

	const getGroupChats = async () => {
		if (sessionStorage.getItem("access_token")) {
			const response = await fetch(
				`${baseURL}/chats?access_token=${sessionStorage.getItem(
					"access_token"
				)}`
			);
			console.log(response);
			await response.json().then((data) => {
				setGroups(data.response);
			});
		} else {
			alert("Please authenticate with Groupme");
		}
	};

	return auth ? (
		!retrieved ? (
			<div
				className="underline hover:cursor-pointer font-bold font-sans p-3"
				onClick={getGroupChats}
			>
				Get Chats →
			</div>
		) : (
			<div></div>
		)
	) : (
		<div
			className="underline hover:cursor-pointer font-bold font-sans p-3"
			onClick={handleRedirect}
		>
			Login →
		</div>
	);
};
export default Groupme;
