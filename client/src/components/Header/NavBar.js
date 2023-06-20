import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { logout } from "../../services/authService";

import Register from "./Register";
import Login from "./Login";

const header = process.env.PUBLIC_URL + "/assets/header-logos.jpg";
const doc = process.env.PUBLIC_URL + "/assets/public-resume.pdf";

const NavBar = ({ userData, setUserData, signedIn, setSignedIn, screenName, setScreenName }) => {
	const [showSignIn, setShowSignIn] = useState(false);
	const showSignInOC = () => {
		clearLoginForm();
		setShowSignIn(true);
	}
	const hideSignInOC = () => {
		clearLoginForm();
		setShowSignIn(false);
	}

	const [showRegister, setShowRegister] = useState(false);
	const showRegisterOC = () => {
		clearLoginForm();
		setShowRegister(true);
	}
	const hideRegisterOC = () => {
		clearLoginForm();
		setShowRegister(false);
	}

	const [loginForm, setLoginForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		pass: ""
	});

	function updateLoginForm(value) {
		return setLoginForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function clearLoginForm() {
		return setLoginForm((prev) => {
			return { ...prev, ...{ first_name: "", last_name: "", email: "", pass: "" } };
		});
	}

	async function handleLogout() {
		try {
			await logout().then(
				(response) => {
					if (response) window.alert("Logged out successfully.");
					else window.alert("Logged out with error.");
				},
				() => {
					window.alert("Logged out with error.");
				});
			window.location.reload();
		}
		catch (error) {
			window.alert("Logged out with error.");
			window.location.reload();
		}
	}

	return (
		<div>
			<img src={header} alt="OS Logos" />
			<nav className="app-nav">
				<ul>
					<li>
						<Link className="app-nav-btn" to={"/home"}><i className="fas fa-home"></i>Home</Link>
					</li>
					<li>
						<a className="app-nav-btn" href={doc} target="_blank" rel="noreferrer"><i className="fas fa-file"></i>Resume</a>
					</li>
					<li>
						<Link className="app-nav-btn" to={"/projects"}><i className="fas fa-wrench"></i>Projects</Link>
					</li>
					<li hidden={true}>
						<Link className="app-nav-btn" to={"/admin"}><i className="fas fa-tools"></i>Admin</Link>
					</li>
					<Dropdown as="li" className="" drop="down-centered">
						<Dropdown.Toggle as="button" className="app-nav-btn">
							<i className="fas fa-user"></i>
							User
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item className="" hidden={!signedIn}>Logged in as: {screenName}</Dropdown.Item>
							<Dropdown.Divider className="" hidden={!signedIn} />
							<Dropdown.Item className="" hidden={signedIn} onClick={showSignInOC}>Log in</Dropdown.Item>
							<Dropdown.Item className="" hidden={signedIn} onClick={showRegisterOC}>Sign up</Dropdown.Item>
							<Dropdown.Item className="" hidden={!signedIn} onClick={handleLogout}>Logout</Dropdown.Item>
							<Dropdown.Divider />
							<Dropdown.Item className="" >Settings</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</ul>
			</nav>

			<Login
				showSignIn={showSignIn}
				hideSignInOC={hideSignInOC}
				loginForm={loginForm}
				updateLoginForm={updateLoginForm}
				setUserData={setUserData}
				setSignedIn={setSignedIn}
				setScreenName={setScreenName}
			/>

			<Register
				showRegister={showRegister}
				hideRegisterOC={hideRegisterOC}
				loginForm={loginForm}
				updateLoginForm={updateLoginForm}
			/>
		</div>
	);
};

export default NavBar;
