import React, { useState } from "react";
import "./Stability.css";
const engineId = "stable-diffusion-512-v2-1";
const apiHost = "https://api.stability.ai";

const Stability = ({
	apiKey,
	base64Uploaded,
	generatedPics,
	setGeneratedPics,
}) => {
	const stabilityCall = async (resizedImage, style) => {
		if (apiKey) {
			const formData = new FormData();
			formData.append("init_image", resizedImage);
			formData.append("init_image_mode", "IMAGE_STRENGTH");
			formData.append("image_strength", 0.5);
			formData.append(
				"text_prompts[0][text]",
				`upper-body portrait illustration of an anime character in the style of anime drawn in manga. 
				warm colors, illustration, concept art,
				character concept, cinematic, key art, high detail, intricate abstract`
			);
			formData.append("text_prompts[0][weight]", 1);
			formData.append(
				"text_prompts[1][text]",
				"blurry, bad, ugly, deform, disfigured, sexy, nudity"
			);
			formData.append("text_prompts[1][weight]", -1);
			// formData.append("seed", 2);
			formData.append("style_preset", "anime");
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
				responseJSON.artifacts.forEach((image) => {
					const newGeneratedPics = [...generatedPics, image.base64];
					console.log("newGeneratedPics", newGeneratedPics);
					setGeneratedPics(newGeneratedPics);
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
	const resizeToCanvas = async (base64String) => {
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
	const getImageBlob = async () => {
		const canvas = await resizeToCanvas(base64Uploaded);
		const resizedBlob = await blobify(canvas);
		return new Promise((resolve) => resolve(resizedBlob));
	};
	const handleGenerate = async () => {
		const res = await fetch(`${apiHost}/v1/user/account`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});
		console.log("res", res);
		if (res.ok) {
			const resizedImage = await getImageBlob();
			const response = await stabilityCall(resizedImage, "anime");
		} else {
			alert("Double Check API Key");
		}
	};

	return (
		<div
			className="underline hover:cursor-pointer font-bold font-sans p-3 "
			onClick={() => handleGenerate()}
		>
			Generate
		</div>
	);
};
export default Stability;
