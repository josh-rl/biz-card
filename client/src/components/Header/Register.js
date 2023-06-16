import Offcanvas from "react-bootstrap/Offcanvas";
import { register } from "../../services/authService";

const Register = ({showRegister, hideRegisterOC, loginForm, updateLoginForm}) => {
	async function onRegister(props) {
		props.preventDefault();
		const newUser = {
			first_name: loginForm.first_name,
			last_name: loginForm.last_name,
			email: loginForm.email,
			pass: loginForm.pass
		};
		if (newUser.first_name === "") {
			window.alert("Missing first name field.");
			return;
		}
		if (newUser.last_name === "") {
			window.alert("Missing last name field.");
			return;
		}
		if (newUser.email === "") {
			window.alert("Missing email field.");
			return;
		}
		if (newUser.pass === "") {
			window.alert("Missing password field.");
			return;
		}
		await register(newUser).then(
		(response) => {
			if (response.statusCode === 201) {
				window.alert("New account has been created.");
				hideRegisterOC();
				window.location.reload();
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
		<Offcanvas className="register-oc" style={{minHeight:"100vh"}} placement="top" show={showRegister} onHide={hideRegisterOC} backdrop='static'>
			<Offcanvas.Header className="register-oc-header" closeButton={true}>
				<Offcanvas.Title>Enter Registration Info:</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className='register-oc-body'>
				<div className="register-container">
				<form className="register-oc-form" onSubmit={onRegister}>
					<div>
						<label htmlFor="register-fname">First name:</label>
						<input
							type="text"
							className="form-control"
							id="register-fname"
							value={loginForm.first_name}
							onChange={(entry) => updateLoginForm({ first_name: entry.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="register-lname">Last name:</label>
						<input
							type="text"
							className="form-control"
							id="register-lname"
							value={loginForm.last_name}
							onChange={(entry) => updateLoginForm({ last_name: entry.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="register-email">Email:</label>
						<input
							type="email"
							className="form-control"
							id="register-email"
							value={loginForm.email}
							onChange={(entry) => updateLoginForm({ email: entry.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="register-password">Password:</label>
						<input
							type="password"
							className="form-control"
							id="register-password"
							value={loginForm.pass}
							onChange={(entry) => updateLoginForm({ pass: entry.target.value })}
						/>
					</div>
					<div className="form-group formSubmitBtn">
						<input
							type="submit"
							value="Register"
							className="btn btn-dark form-control"
						/>
					</div>
				</form>
				</div>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default Register;
