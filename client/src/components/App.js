import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { verifyLogin, parsePayload } from "../services/authService";

import NavBar from "./Header/NavBar";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import AdminPanel from "./AdminPanel/AdminPanel";

import "../styles/reset.css";
import "bootstrap/dist/css/bootstrap.css";
// import "../styles/style.css";
import "../styles/main.css";

const App = () => {
	const [userData, setUserData] = useState({
		_id: "",
		first_name: "",
		last_name: "",
		email: ""
	});
	const [signedIn, setSignedIn] = useState(false);
	const [screenName, setScreenName] = useState("");

	useEffect(() => {
		verifyLogin().then(
			(response) => {
				if (response.success === true) {
					const decoded = parsePayload();
					if (!decoded) return;
					setScreenName(decoded.first_name);
					setUserData({
						_id: decoded._id,
						first_name: decoded.first_name,
						last_name: decoded.last_name,
						email: decoded.email
					});
					setSignedIn(true);
					return;
				} else {
					setScreenName("");
					setUserData({
						_id: "",
						first_name: "",
						last_name: "",
						email: ""
					});
					setSignedIn(false);
				}
			},
			(error) => {
				console.log(`${error}`);
			});
	}, []);

	return (
		<div className="app">

			<div className="app-header">
				<NavBar
					userData={userData}
					setUserData={setUserData}
					signedIn={signedIn}
					setSignedIn={setSignedIn}
					screenName={screenName}
					setScreenName={setScreenName}
				/>
			</div>

			<div className="app-container">
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/admin" element={<AdminPanel />} />
					<Route path="*" element={<div className="app-container-base"><h2>404: Page not found.</h2></div>} />
				</Routes>
			</div>

		</div>
	);
};

export default App;
