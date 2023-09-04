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
			type="file"
			ref={fileInputRef}
			multiple={false}
			onChange={handleUpload}
		/>
	);
};

export default ImageUpload;
