import React, { useState, useEffect } from "react";
import Groupme from "../Groupme/Groupeme";
import Stability from "../Stability/Stability";
import "./Home.css";

const Homepage = () => {
	const [groups, setGroups] = useState([]);
	const [generated, setGenerated] = useState(false);
	const [auth, setAuth] = useState(false);
	const [apiKey, setApiKey] = useState("");
	const rick = `data:image/jpeg;base64,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`;

	return (
		<div className="flex flex-col w-4/5 m-8 rounded items-center">
			<div className="flex flex-row justify-center items-center h-1/2">
				<Groupme
					groups={groups}
					setGroups={setGroups}
					auth={auth}
					setAuth={setAuth}
				/>
				{auth && (
					<Stability
						groups={groups}
						setGroups={setGroups}
						setGenerated={setGenerated}
						apiKey={apiKey}
					/>
				)}
				{auth && (
					<input
						className="h-1/4 w-2/4 m-2 p-2 rounded border-2 border-gray-400"
						value={apiKey}
						onChange={(event) => {
							setApiKey(event.target.value);
						}}
						placeholder="Stability API Key"
					/>
				)}
			</div>
			<div className="flex flex-row justify-evenly w-full">
				<div className="flex flex-wrap w-2/4 m-2">
					{groups.map((group, key) => {
						return (
							<div key={key} className="flex flex-col items-center w-1/3">
								<p className="truncate w-3/4 text-center underline underline-offset-2 font-sans font-medium mb-1 p-1">
									{group.name}
								</p>
								{group.image_url ? (
									<img width="200px" src={group.image_url} alt={group.name} />
								) : (
									<img width="200px" src={rick} alt="rick" />
								)}
							</div>
						);
					})}
				</div>
				{generated && (
					<div className="flex flex-wrap w-2/4 m-2">
						{groups.map((group, key) => {
							return (
								<div key={key} className="flex flex-col items-center w-1/3">
									<p className="truncate w-3/4 text-center underline underline-offset-2 font-sans font-medium mb-1 p-1">
										{group.name}
									</p>
									{group.stability_images_base64s ? (
										<img
											width="200px"
											src={`data:image/png;base64,${group.stability_images_base64s}`}
											alt="no stability image"
										/>
									) : (
										<img width="200px" src={rick} alt="rick" />
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Homepage;
