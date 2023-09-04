import React, { useState } from "react";
import Stability from "../Stability/Stability";
import ImageUpload from "../ImageUpload/ImageUpload";
import logo from "../../images/favicon-32x32.png";
import "./Home.css";

const Homepage = () => {
	const [apiKey, setApiKey] = useState("");
	const [base64Uploaded, setBase64Uploaded] = useState("");
	const [generatedPics, setGeneratedPics] = useState([]);
	const [loading, setLoading] = useState(false);
	return (
		<div className="flex flex-col w-4/5 m-8 rounded items-center">
			<div className="flex flex-row w-full items-center">
				<img height="50%" src={logo} alt="" />
				<h1 className="text-4xl font-bold ml-3">CoverUp</h1>
			</div>
			<div className="flex flex-row w-full items-center">
				{!base64Uploaded && (
					<div className="flex flex-row items-center">
						<ImageUpload setBase64Uploaded={setBase64Uploaded} />
					</div>
				)}
				{base64Uploaded && (
					<Stability
						apiKey={apiKey}
						base64Uploaded={base64Uploaded}
						generatedPics={generatedPics}
						setGeneratedPics={setGeneratedPics}
						setLoading={setLoading}
					/>
				)}
				{base64Uploaded && (
					<div className="flex flex-row items-center">
						<input
							className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm "
							placeholder="Stability API Key..."
							type="text"
							value={apiKey}
							onChange={(event) => {
								setApiKey(event.target.value);
							}}
						/>
					</div>
				)}
				{loading && (
					<div className="flex flex-row items-center text-center font-bold font-sans pl-1">
						Loading...
					</div>
				)}
			</div>
			<div className="flex flex-row w-full">
				<div className="self-center">
					{base64Uploaded && <img width="200px" src={base64Uploaded} alt="" />}
				</div>
				<div className="flex flex-wrap w-3/4 m-2">
					{Object.keys(generatedPics).map((style, key) => {
						return (
							<div key={key} className="flex flex-col items-center w-1/3">
								{console.log("style", style)}
								<p className="truncate w-3/4 text-center underline underline-offset-2 font-sans font-medium mb-1 p-1">
									{style}
								</p>
								<img
									width="200px"
									src={`data:image/png;base64,${generatedPics[style].artifacts[0].base64}`}
									alt=""
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
