// import React from "react";
// import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
// import UserList from "./components/UserList";

// function App() {
//   return (
//     <div className="App">
//       <AudioPlayer/>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsernamePage from "./pages/UsernamePage";
import AudioPlayer from "./pages/AudioPlayer";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<UsernamePage />} />
				<Route path="/audioplayer" element={<AudioPlayer />} />
			</Routes>
		</Router>
	);
}

export default App;
