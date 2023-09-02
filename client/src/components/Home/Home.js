import React, { useState, useEffect } from "react";
import Groupme from "../Groupme/Groupeme";
import Stability from "../Stability/Stability";
import "./Home.css";

const Homepage = () => {
	const [groups, setGroups] = useState([]);
	const [generated, setGenerated] = useState(false);
	const [auth, setAuth] = useState(false);
	// useEffect(() => {
	// 	console.log(sessionStorage);
	// }, []);
	return (
		<div className="flex flex-col w-4/5 m-8 rounded">
			<div className="flex flex-row justify-center h-1/2">
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
					/>
				)}
			</div>
			<div className="flex flex-row justify-evenly w-full">
				<div className="flex flex-wrap w-2/4 m-2">
					{groups.map((group, key) => {
						return (
							<div key={key} className="flex flex-col items-center w-1/3">
								<p className="truncate w-3/4 text-center underline underline-offset-2 font-sans font-bold mb-1">
									{group.name}
								</p>
								{group.image_url ? (
									<img width="200px" src={group.image_url} alt={group.name} />
								) : (
									<div>No image</div>
								)}
							</div>
						);
					})}
				</div>
				{groups.length > 0 && (
					<div className="flex flex-wrap w-2/4 m-2">
						{groups.map((group, key) => {
							return (
								<div key={key} className="flex flex-col items-center w-1/3">
									<p className="truncate w-3/4 text-center underline underline-offset-2 font-sans font-bold mb-1">
										{group.name}
									</p>
									{group.image_url ? (
										<img
											width="200px"
											src={`data:image/png;base64,${group.stability_images_base64s}`}
											alt="no stability image"
										/>
									) : (
										<div>No image</div>
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
