import Cookies from "universal-cookie";

/**
 * Not for external use.
 * @returns {string} Domain string based on node environment.
 */
function getDomain() {
	return "http://localhost:4000/api";
	// if (process.env.NODE_ENV === "production") {
	// 	return process.env.REACT_APP_PROD_DOMAIN;
	// }
	// if (process.env.NODE_ENV === "development") {
	// 	return process.env.REACT_APP_DEV_DOMAIN;
	// }
}

/**
 * Not for external use.
 * @param {string} payload JWT encoded token string.
 * @returns {object | false} JSON Object on success, FALSE on failure.
 */
function decodeJwt(payload) {
	try {
		let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * Warning! Does not check for token validity. Use verifyLogin() to check
 * for token validity.
 * 
 * @returns {object | false} JSON Object on success, FALSE on failure.
 */
export function parsePayload() {
	const cookies = new Cookies();
	let pubCookie;
	let decoded;
	try {
		pubCookie = cookies.get("public");
		if (!pubCookie) throw new Error("Cookie not found.");
		decoded = decodeJwt(pubCookie.payload);
		if (!decoded) throw new Error("Cookie could not be decoded.");
		return decoded;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @returns {Promise<object | false>} JSON Object on success, FALSE on failure.
 */
export async function verifyLogin() {
	try {
		let response;
		await fetch(`${getDomain()}/auth/check`, {
			method: "GET",
			credentials: "include"
		}).then(
			async (value) => {
				response = await value.json();
			},
			(error) => {
				console.log(error);
				response = false;
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @param {function} setState Function to set state.
 * @returns {Promise<boolean>} TRUE for success, FALSE for failure.
 */
export async function allUsers(setState) {
	try {
		let response = false;
		await fetch(`${getDomain()}/users/all`, {
			method: "GET"
		}).then(
			async (value) => {
				response = await value.json()
				if (response.statusCode === 200) {
					setState(response.data);
					response = true;
				} else {
					console.log(`Status Code: ${response.status}\nMessage: ${response.message}`);
				}
			},
			(error) => {
				console.log(error);
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @param {string} id User ID.
 * @param {[object]} oldUsers Array to be updated.
 * @param {function} setState Funciton to set state.
 * @returns {Promise<boolean>} TRUE for success, FALSE for failure.
 */
export async function deleteUser(id, oldUsers, setState) {
	try {
		let response = false;
		await fetch(`${getDomain()}/users/${id}`, {
			method: "DELETE"
		}).then(
			async (value) => {
				response = await value.json();
				if (response.statusCode === 201) {
					const newUsers = oldUsers.filter((n) => n._id !== id);
					setState(newUsers);
					response = true;
				} else {
					console.log(`Status Code: ${response.status}\nMessage: ${response.message}`);
				}
			},
			(error) => {
				console.log(error);
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @param {string} id User ID.
 * @param {object} editedUser JSON Object in schema format.
 * @returns {Promise<boolean>} JSON Object for success, FALSE for failure.
 */
export async function editUser(id, editedUser) {
	try {
		let response = false;
		await fetch(`${getDomain()}/users/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify(editedUser),
		}).then(
			async (value) => {
				response = await value.json();
				if (response.success === true) {
					response = true;
				}
				else {
					console.log(`Status Code: ${response.status}\nMessage: ${response.message}`);
				}
			},
			(error) => {
				console.log(error);
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @param {string} id User ID.
 * @param {function} setState Function to set state.
 * @returns {Promise<boolean>} TRUE for success, FALSE for failure.
 */
export async function userByID(id, setState) {
	try {
		let response = false;
		await fetch(`${getDomain()}/users/byID/${id}`, {
			method: "GET"
		}).then(
			async (value) => {
				response = await value.json();
				if (response.statusCode === 200) {
					setState(response.data);
					response = true;
				} else {
					console.log(`Status Code: ${response.status}\nMessage: ${response.message}`);
				}
			},
			(error) => {
				console.log(error);
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @param {object} credentials JSON Object with email/password.
 * @returns {Promise<object | false>} JSON Object for success, FALSE for failure.
 */
export async function login(credentials) {
	try {
		let response;
		await fetch(`${getDomain()}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "include",
			body: JSON.stringify(credentials)
		}).then(
			async (value) => {
				response = await value.json();
			},
			(error) => {
				console.log(error);
				response = false;
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @param {object} newUser JSON Object in schema format.
 * @returns {Promise<object | false>} JSON Object for success, FALSE for failure.
 */
export async function register(newUser) {
	try {
		let response;
		await fetch(`${getDomain()}/auth/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		}).then(
			async (value) => {
				response = await value.json();
			},
			(error) => {
				console.log(error);
				response = false;
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

/**
 * @returns {Promise<object | false>} JSON Object for success, FALSE for failure.
 */
export async function logout() {
	try {
		const decoded = parsePayload();
		if (!decoded) return true;
		let response;
		await fetch(`${getDomain()}/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({uid: decoded._id}),
		}).then(
			async (value) => {
				response = await value.json();
			},
			(error) => {
				console.log(error);
				response = false;
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}
