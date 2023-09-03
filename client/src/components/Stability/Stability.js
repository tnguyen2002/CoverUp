import React, { useState } from "react";
import "./Stability.css";
const engineId = "stable-diffusion-v1-5";
const apiHost = "https://api.stability.ai";

const Stability = ({ groups, setGroups, setGenerated, apiKey }) => {
	const stabilityCall = async (groupKey) => {
		if (apiKey) {
			const formData = new FormData();
			formData.append("init_image", groups[groupKey].resizedBlob);
			formData.append("init_image_mode", "IMAGE_STRENGTH");
			formData.append("image_strength", 0.5);
			formData.append("text_prompts[0][text]", "light background with clouds");
			formData.append("style_preset", "fantasy-art");
			formData.append("cfg_scale", 7);
			formData.append("samples", 1);
			formData.append("steps", 30);
			const response = await fetch(
				`${apiHost}/v1/generation/${engineId}/image-to-image`,
				{
					method: "POST",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${apiKey}`,
					},
					body: formData,
				}
			);
			const responseJSON = await response.json();
			if (response.ok) {
				responseJSON.artifacts.forEach((image, key) => {
					const newGroups = [...groups];
					newGroups[groupKey].stability_images_base64s = image.base64;
					setGroups(newGroups);
				});
				return new Promise((resolve) => resolve(responseJSON));
			}
		}
	};
	const blobify = (canvas) => {
		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				resolve(blob);
			}, "image/png");
		});
	};
	const blobFileReader = (blobData, key) => {
		const reader = new FileReader();
		return new Promise((resolve, reject) => {
			reader.onerror = () => {
				reader.abort();
				reject(new DOMException("Problem parsing input file."));
			};
			reader.onload = () => {
				const base64String = reader.result;
				resolve(base64String);
			};
			reader.readAsDataURL(blobData);
		});
	};
	const resizeToCanvas = async (blobData, key) => {
		const base64String = await blobFileReader(blobData, key);
		const newGroups = [...groups];
		newGroups[key].base64 = base64String;
		setGroups(newGroups);
		let img = new Image();
		img.src = base64String;
		await new Promise((resolve) => img.addEventListener("load", resolve));
		let sw = 512;
		let sh = 512;
		let canvas = document.createElement("canvas");
		canvas.width = sw;
		canvas.height = sh;
		let ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, sw, sh);
		ctx.canvas.originalWidth = img.width;
		ctx.canvas.originalHeight = img.height;
		return new Promise((resolve) => resolve(canvas));
	};
	const getImageBlob = async (group, key) => {
		if (group.image_url) {
			const imageID = group.image_url.split("/")[3];
			const api = `http://localhost:4000/images/${imageID}`;
			const image = await fetch(`http://localhost:4000/images/${imageID}`)
				.then((response) => response.blob())
				.then(async (blob) => {
					const canvas = await resizeToCanvas(blob, key);
					const resizedBlob = await blobify(canvas);
					const newGroups = groups;
					newGroups[key].resizedBlob = resizedBlob;
					setGroups(newGroups);
				});
			return new Promise((resolve) => resolve(groups[key].resizedBlob));
		} else {
			const newGroups = groups;
			newGroups[key].resizedBlob = null;
			newGroups[key].base64 = null;
			setGroups(newGroups);
			return new Promise((resolve) => resolve(groups[key].resizedBlob));
		}
	};
	const handleGenerate = async () => {
		const res = await fetch(`${apiHost}/v1/user/account`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
		if (res.ok) {
			groups.map(async (group, key) => {
				if (key == 0) {
					const groupImageBlob = await getImageBlob(group, key);
					if (groupImageBlob) {
						const response = await stabilityCall(key);
					}
				}
			});
			setGenerated(true);
		} else {
			alert("Double Check API Key");
		}
	};

	return (
		<div
			className="underline hover:cursor-pointer font-bold font-sans p-3"
			onClick={() => handleGenerate()}
		>
			Generate →
		</div>
	);
};
export default Stability;
