import logo from "./logo.svg";
import "./App.css";
import Homepage from "./components/Home/Home";
function App() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-zinc-100">
			<Homepage />
			<p>A picture is worth a thousand words</p>
		</div>
	);
}

export default App;
