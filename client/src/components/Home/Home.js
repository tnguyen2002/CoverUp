import React, { useState, useEffect } from "react";
import Groupme from "../Groupme/Groupeme";
import Stability from "../Stability/Stability";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./Home.css";

const Homepage = () => {
	const [apiKey, setApiKey] = useState("");
	const [base64Uploaded, setBase64Uploaded] = useState("");
	const [generatedPics, setGeneratedPics] = useState([]);

	return (
		<div className="flex flex-col w-4/5 m-8 rounded items-center">
			<div className="flex flex-row h-1/2 w-full justify-between">
				<div className="flex flex-row items-center ">
					<ImageUpload setBase64Uploaded={setBase64Uploaded} />
				</div>
				{base64Uploaded && (
					<Stability
						apiKey={apiKey}
						base64Uploaded={base64Uploaded}
						generatedPics={generatedPics}
						setGeneratedPics={setGeneratedPics}
					/>
				)}
				{base64Uploaded && (
					<div className="flex flex-row items-center">
						<input
							className="h-1/4 w-2/4 m-2 p-2 rounded border-2 border-gray-400"
							value={apiKey}
							onChange={(event) => {
								setApiKey(event.target.value);
							}}
							placeholder="Stability API Key"
						/>
					</div>
				)}
			</div>
			<div className="flex flex-row justify-evenly w-full">
				{base64Uploaded && (
					<img width="200px" src={base64Uploaded} alt={"image"} />
				)}
				<div className="flex flex-wrap w-2/4 m-2">
					{generatedPics.map((base64, key) => {
						return (
							<div key={key} className="flex flex-col items-center w-1/3">
								{/* <p className="truncate w-3/4 text-center underline underline-offset-2 font-sans font-medium mb-1 p-1">
									{group.name}
								</p> */}
								<img
									width="200px"
									src={`data:image/png;base64,${base64}`}
									alt={"image"}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Homepage;
