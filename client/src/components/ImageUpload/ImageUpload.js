import React from "react";
import { useRef } from "react";

const ImageUpload = ({ setBase64Uploaded }) => {
	const fileInputRef = useRef(null);
	const handleUpload = () => {
		const file = fileInputRef.current.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			setBase64Uploaded(event.target.result);
		};
		reader.readAsDataURL(file);
	};

	return (
		<input
			className="block w-full text-sm text-slate-500
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						file:bg-zinc-100 file:text-black
						hover:file:bg-violet-100"
			type="file"
			ref={fileInputRef}
			multiple={false}
			onChange={handleUpload}
		/>
	);
};

export default ImageUpload;
