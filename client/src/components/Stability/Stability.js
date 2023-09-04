import React, { useState } from "react";
import "./Stability.css";
const engineId = "stable-diffusion-512-v2-1";
// const engineId = "stable-diffusion-xl-beta-v2-2-2";

const apiHost = "https://api.stability.ai";

const Stability = ({
	apiKey,
	base64Uploaded,
	setGeneratedPics,
	setLoading,
}) => {
	const createStyles = async (resizedImage) => {
		const styles = {};
		const animeFormData = new FormData();
		animeFormData.append("init_image", resizedImage);
		animeFormData.append("init_image_mode", "IMAGE_STRENGTH");
		animeFormData.append("image_strength", 0.5);
		animeFormData.append(
			"text_prompts[0][text]",
			`upper-body portrait illustration of an anime character in the style of Koyoharu Gotouge with detailed eyes. 
				warm colors, illustration, concept art,
				character concept, ultra high detail, key art, highly detailed facial features, intricate abstract`
		);
		animeFormData.append("text_prompts[0][weight]", 1);
		animeFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		animeFormData.append("text_prompts[1][weight]", -1);
		// animeFormData.append("seed", 2);
		animeFormData.append("style_preset", "anime");
		animeFormData.append("cfg_scale", 7);
		animeFormData.append("samples", 1);
		animeFormData.append("steps", 30);

		const cartoonFormData = new FormData();
		cartoonFormData.append("init_image", resizedImage);
		cartoonFormData.append("init_image_mode", "IMAGE_STRENGTH");
		cartoonFormData.append("image_strength", 0.5);
		cartoonFormData.append(
			"text_prompts[0][text]",
			`upper-body portrait illustration of cartoon character in the style of marvel comics with detailed eyes. 
				warm colors, illustration, concept art, character concept, key art, highly detailed facial features, intricate abstract`
		);
		cartoonFormData.append("text_prompts[0][weight]", 1);
		cartoonFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		cartoonFormData.append("text_prompts[1][weight]", -1);
		// cartoonFormData.append("seed", 2);
		cartoonFormData.append("style_preset", "comic-book");
		cartoonFormData.append("cfg_scale", 7);
		cartoonFormData.append("samples", 1);
		cartoonFormData.append("steps", 30);

		const fantasyFormData = new FormData();
		fantasyFormData.append("init_image", resizedImage);
		fantasyFormData.append("init_image_mode", "IMAGE_STRENGTH");
		fantasyFormData.append("image_strength", 0.5);
		fantasyFormData.append(
			"text_prompts[0][text]",
			`upper-body portrait illustration in the style of fantasy with detailed eyes.
				warm colors, illustration, concept art,
				character concept, cinematic, key art, high detail, intricate abstract`
		);
		fantasyFormData.append("text_prompts[0][weight]", 1);
		fantasyFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		fantasyFormData.append("text_prompts[1][weight]", -1);
		// fantasyFormData.append("seed", 2);
		fantasyFormData.append("style_preset", "fantasy-art");
		fantasyFormData.append("cfg_scale", 7);
		fantasyFormData.append("samples", 1);
		fantasyFormData.append("steps", 30);

		const superheroFormData = new FormData();
		superheroFormData.append("init_image", resizedImage);
		superheroFormData.append("init_image_mode", "IMAGE_STRENGTH");
		superheroFormData.append("image_strength", 0.5);
		superheroFormData.append(
			"text_prompts[0][text]",
			`upper-body portrait illustration of a superhero with a mask in the style of DC Comics with detailed eyes. character design, cinematic lighting,
			symmetrical, global illumination, trending on artstation, highly detailed facial features, concept art, illustration`
		);
		superheroFormData.append("text_prompts[0][weight]", 1);
		superheroFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		superheroFormData.append("text_prompts[1][weight]", -1);
		// cinematicFormData.append("seed", 2);
		superheroFormData.append("style_preset", "comic-book");
		superheroFormData.append("cfg_scale", 7);
		superheroFormData.append("samples", 1);
		superheroFormData.append("steps", 30);

		const jediFormData = new FormData();
		jediFormData.append("init_image", resizedImage);
		jediFormData.append("init_image_mode", "IMAGE_STRENGTH");
		jediFormData.append("image_strength", 0.5);
		jediFormData.append(
			"text_prompts[0][text]",
			`upper-body portrait illustration of a jedi in the style of star wars with detailed eyes. character design, cinematic lighting,
			symmetrical, global illumination, radiant light, trending on artstation, concept art, illustration`
		);
		jediFormData.append("text_prompts[0][weight]", 1);
		jediFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		jediFormData.append("text_prompts[1][weight]", -1);
		jediFormData.append("cfg_scale", 7);
		jediFormData.append("samples", 1);
		jediFormData.append("steps", 30);

		const ninjaFormData = new FormData();
		ninjaFormData.append("init_image", resizedImage);
		ninjaFormData.append("init_image_mode", "IMAGE_STRENGTH");
		ninjaFormData.append("image_strength", 0.5);
		ninjaFormData.append(
			"text_prompts[0][text]",
			`upper-body portrait illustration of a ninja in the style of naruto shippuden with detailed eyes. character design, warm colors, illustration, concept art,
			character concept, cinematic, key art, highly detailed facial features, intricate abstract`
		);
		ninjaFormData.append("text_prompts[0][weight]", 1);
		ninjaFormData.append(
			"text_prompts[1][text]",
			"blurry, bad, ugly, deform, disfigured, sexy, nudity"
		);
		ninjaFormData.append("text_prompts[1][weight]", -1);
		ninjaFormData.append("cfg_scale", 7);
		ninjaFormData.append("samples", 1);
		ninjaFormData.append("steps", 30);

		styles.Anime = animeFormData;
		styles.Cartoon = cartoonFormData;
		styles.Fantasy = fantasyFormData;
		styles.Superhero = superheroFormData;
		styles.Jedi = jediFormData;
		styles.Ninja = ninjaFormData;
		return new Promise((resolve) => resolve(styles));
	};
	const stabilityCall = async (resizedImage) => {
		if (apiKey) {
			const responses = {};
			const styles = await createStyles(resizedImage);
			console.log("styles", styles);
			for (const style in styles) {
				const formData = styles[style];
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
