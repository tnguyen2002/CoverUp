import React from "react";
import "./Stability.css";
// const engineId = "stable-diffusion-v1-5";
const engineId = "stable-diffusion-512-v2-1";
// const engineId = "stable-diffusion-xl-beta-v2-2-2";
// const engineId = "stable-diffusion-xl-1024-v0-9";
const apiHost = "https://api.stability.ai";

const Stability = ({
	apiKey,
	base64Uploaded,
	setGeneratedPics,
	setLoading,
	prompt,
}) => {
	const createStyles = async (resizedImage) => {
		const styles = {};
		const animeFormData = new FormData();
		animeFormData.append("init_image", resizedImage);
		animeFormData.append("init_image_mode", "IMAGE_STRENGTH");
		animeFormData.append("image_strength", 0.5);
		animeFormData.append(
			"text_prompts[0][text]",
			`${prompt.gender}, ${prompt.outfit}, ${prompt.background}, illustration in the style of anime, high quality, digital painting. warm colors, illustration, concept art,
			character concept, ultra high detail, key art, highly detailed facial features, intricate abstract`
		);
		animeFormData.append("text_prompts[0][weight]", 1);
		animeFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		animeFormData.append("text_prompts[1][weight]", -1);
		animeFormData.append("style_preset", "anime");
		animeFormData.append("cfg_scale", 7);
		animeFormData.append("samples", 1);
		animeFormData.append("steps", 40);

		const superheroFormData = new FormData();
		superheroFormData.append("init_image", resizedImage);
		superheroFormData.append("init_image_mode", "IMAGE_STRENGTH");
		superheroFormData.append("image_strength", 0.5);
		superheroFormData.append(
			"text_prompts[0][text]",
			`${prompt.gender}, ${prompt.outfit}, ${prompt.background},illustration in the style of DC Comics. character design, cinematic lighting,
			symmetrical, global illumination, trending on artstation, highly detailed facial features, concept art, illustration`
		);
		superheroFormData.append("text_prompts[0][weight]", 1);
		superheroFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		superheroFormData.append("text_prompts[1][weight]", -1);
		superheroFormData.append("style_preset", "comic-book");
		superheroFormData.append("cfg_scale", 7);
		superheroFormData.append("samples", 1);
		superheroFormData.append("steps", 40);

		const isometricFormData = new FormData();
		isometricFormData.append("init_image", resizedImage);
		isometricFormData.append("init_image_mode", "IMAGE_STRENGTH");
		isometricFormData.append("image_strength", 0.6);
		isometricFormData.append(
			"text_prompts[0][text]",
			`${prompt.gender}, ${prompt.outfit}, ${prompt.background}, illustration of a character in an isometric style. warm colors, concept art,
		character concept, key art, high detail`
		);
		isometricFormData.append("text_prompts[0][weight]", 1);
		isometricFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		isometricFormData.append("text_prompts[1][weight]", -1);
		isometricFormData.append("style_preset", "isometric");
		isometricFormData.append("cfg_scale", 7);
		isometricFormData.append("samples", 1);
		isometricFormData.append("steps", 40);

		styles.Anime = animeFormData;
		styles.Isometric = isometricFormData;
		styles.Superhero = superheroFormData;
		return new Promise((resolve) => resolve(styles));
	};
	const stabilityCall = async (resizedImage) => {
		if (apiKey) {
			const responses = {};
			const styles = await createStyles(resizedImage);
			console.log("styles", styles);
			for (const style in styles) {
				const formData = styles[style];
				console.log(style, formData);
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
					responses[style] = responseJSON;
				}
			}
			return new Promise((resolve) => resolve(responses));
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
		let sw = 768;
		let sh = 768;
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
		if (res.ok) {
			setLoading(true);
			const resizedImage = await getImageBlob();
			const responses = await stabilityCall(resizedImage, "anime");
			setGeneratedPics(responses);
			setLoading(false);
			console.log("responses", responses);
		} else {
			alert("Double Check API Key");
		}
	};

	return (
		<div
			className="hover:cursor-pointer hover:text-violet-800 font-bold font-sans p-3 pl-0"
			onClick={() => handleGenerate()}
		>
			Generate →
		</div>
	);
};
export default Stability;
