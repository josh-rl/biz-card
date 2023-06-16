import Offcanvas from "react-bootstrap/Offcanvas";
import { login } from "../../services/authService";

const Login = ({ showSignIn, hideSignInOC, loginForm, updateLoginForm, setUserData, setSignedIn, setScreenName }) => {
	async function onLogin(props) {
		props.preventDefault();
		const thisUser = {
			email: loginForm.email,
			pass: loginForm.pass
		};
		if (thisUser.email === "") {
			window.alert("Missing email field.");
			return;
		}
		if (thisUser.pass === "") {
			window.alert("Missing password field.");
			return;
		}
		await login(thisUser).then(
		(response) => {
			if (response.statusCode === 201) {
				window.alert("Logged in successfully.");
				hideSignInOC();
				window.location.reload();
				return;
			}
			else if (response.statusCode === 470) {
				window.alert("Email not found.");
				return;
			}
			else if (response.statusCode === 472) {
				window.alert("Wrong password.");
				return;
			}
			else if (response.statusCode === 500) {
				window.alert("Internal server error.");
				return;
			}
			else {
				window.alert("Unknown error occured.");
				return;
			}
		},
		(error) => {
			window.alert(`${error}`);
		});
	}

	return (
		<Offcanvas className="sign-in-oc" style={{ minHeight: "100vh" }} placement="top" show={showSignIn} onHide={hideSignInOC} backdrop='static'>
			<Offcanvas.Header className="sign-in-oc-header" closeButton={true}>
				<Offcanvas.Title>Enter Login Info:</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className='sign-in-oc-body'>
				<div className="sign-in-container">
				<form className="sign-in-oc-form" onSubmit={onLogin}>
					<div>
						<label htmlFor="login-email">Email:</label>
						<input
							type="email"
							className="form-control"
							id="login-email"
							value={loginForm.email}
							onChange={(entry) => updateLoginForm({ email: entry.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="login-password">Password:</label>
						<input
							type="password"
							className="form-control"
							id="login-password"
							value={loginForm.pass}
							onChange={(entry) => updateLoginForm({ pass: entry.target.value })}
						/>
					</div>
					<div className="form-group formSubmitBtn">
						<input
							type="submit"
							value="Login"
							className="btn btn-dark form-control"
						/>
					</div>
				</form>
				</div>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default Login;
