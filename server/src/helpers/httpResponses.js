export function findSuccess(item) {
	return {
		success: true,
		statusCode: 200,
		message: "Item found.",
		data: item
	};
}

export function findManySuccess(data, count) {
	return {
		success: true,
		statusCode: 200,
		message: "Data found.",
		data: data,
		total: count
	};
}

export function createSuccess(item) {
	return {
		success: true,
		statusCode: 201,
		message: "Item created.",
		data: item
	};
}

export function updateSuccess(item) {
	return {
		success: true,
		statusCode: 201,
		message: "Item found and updated.",
		data: item
	};
}

export function deleteSuccess(item) {
	return {
		success: true,
		deleted: true,
		statusCode: 201,
		message: "Item found and deleted.",
		data: item
	};
}

export function authenticationSuccess() {
	return {
		success: true,
		statusCode: 202,
		message: "Client authenticated."
	};
}

export function authenticationDenied(msg) {
	return {
		success: false,
		statusCode: 403,
		message: msg
	};
}

export function emailNotFound() {
	return {
		success: false,
		statusCode: 470,
		message: "Email not found."
	};
}

export function emailNotUnique() {
	return {
		success: false,
		statusCode: 471,
		message: "Email must be unique."
	};
}

export function passwordMismatch() {
	return {
		success: false,
		statusCode: 472,
		message: "Password did not match."
	};
}

export function idNotFound() {
	return {
		success: false,
		statusCode: 473,
		message: "Given _id not found."
	};
}

export function tokenNotFound() {
	return {
		success: false,
		statusCode: 474,
		message: "Token not found."
	};
}

export function tokenExpired() {
	return {
		success: false,
		statusCode: 475,
		message: "Token expired."
	};
}

export function serverError(error) {
	return {
		success: false,
		statusCode: 500,
		message: "Server failure during database query.",
		error: error
	};
}

export function createFailure(item) {
	return {
		success: false,
		statusCode: 500,
		message: "Item could not be created as given.",
		data: item
	};
}

export function updateFailure(id, item) {
	return {
		success: false,
		statusCode: 500,
		message: "Item could not be updated with given data.",
		id: id,
		data: item
	};
}

export function serverFailure(msg) {
	return {
		success: false,
		statusCode: 500,
		message: msg
	};
}
