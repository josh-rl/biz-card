module.exports.findSuccess = (item) => {
	return {
		success: true,
		statusCode: 200,
		message: "Item found.",
		data: item
	};
}

module.exports.findManySuccess = (data, count) => {
	return {
		success: true,
		statusCode: 200,
		message: "Data found.",
		data: data,
		total: count
	};
}

module.exports.createSuccess = (item) => {
	return {
		success: true,
		statusCode: 201,
		message: "Item created.",
		data: item
	};
}

module.exports.updateSuccess = (item) => {
	return {
		success: true,
		statusCode: 201,
		message: "Item found and updated.",
		data: item
	};
}

module.exports.deleteSuccess = (item) => {
	return {
		success: true,
		deleted: true,
		statusCode: 201,
		message: "Item found and deleted.",
		data: item
	};
}

module.exports.authenticationSuccess = () => {
	return {
		success: true,
		statusCode: 202,
		message: "Client authenticated."
	};
}

module.exports.authenticationDenied = (msg) => {
	return {
		success: false,
		statusCode: 403,
		message: msg
	};
}

module.exports.emailNotFound = () => {
	return {
		success: false,
		statusCode: 470,
		message: "Email not found."
	};
}

module.exports.emailNotUnique = () => {
	return {
		success: false,
		statusCode: 471,
		message: "Email must be unique."
	};
}

module.exports.passwordMismatch = () => {
	return {
		success: false,
		statusCode: 472,
		message: "Password did not match."
	};
}

module.exports.idNotFound = () => {
	return {
		success: false,
		statusCode: 473,
		message: "Given _id not found."
	};
}

module.exports.tokenNotFound = () => {
	return {
		success: false,
		statusCode: 474,
		message: "Token not found."
	};
}

module.exports.tokenExpired = () => {
	return {
		success: false,
		statusCode: 475,
		message: "Token expired."
	};
}

module.exports.serverError = (error) => {
	return {
		success: false,
		statusCode: 500,
		message: "Server failure during database query.",
		error: error
	};
}

module.exports.createFailure = (item) => {
	return {
		success: false,
		statusCode: 500,
		message: "Item could not be created as given.",
		data: item
	};
}

module.exports.updateFailure = (id, item) => {
	return {
		success: false,
		statusCode: 500,
		message: "Item could not be updated with given data.",
		id: id,
		data: item
	};
}

module.exports.serverFailure = (msg) => {
	return {
		success: false,
		statusCode: 500,
		message: msg
	};
}
