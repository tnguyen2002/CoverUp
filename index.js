const express = require("express");
// const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.use(cors());

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
app.get("/", (req, res) => {
	res.send({ exampleMessage: "React client connected to the Express Server!" });
});
app.get("/api", (req, res) => {
	// const data = await fetch(apiUrl);
	console.log("grabbing image");
});

app.get("/images/:imageName", async (req, res) => {
	console.log("grabbing image", req.params.imageName);
	try {
		const imageUrl = `https://i.groupme.com/${req.params.imageName}`;
		console.log("imageUrl", imageUrl);
		const response = await fetch(imageUrl);
		const imageArrayBuffer = await response.arrayBuffer();
		const imageBuffer = Buffer.from(imageArrayBuffer);
		res.set("Content-Type", response.headers.get("content-type"));
		res.send(imageBuffer);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});

// app.get("/", (req, res) => {
// 	res.send("All my data”");
// });
