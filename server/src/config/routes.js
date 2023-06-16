import AuthController from "../controllers/AuthController.js";

export default (server) => {

	if (process.env.NODE_ENV === "production") {
		server.post(`/api/register`, AuthController.register);
		server.post(`/api/login`, AuthController.login);
		server.post(`/api/logout`, AuthController.logout);
	}
	
	else if (process.env.NODE_ENV === "development") {
		server.get(`/api/users/all`, AuthController.verifyCallback, AuthController.userController.getAll);
		server.get(`/api/auth/all`, AuthController.verifyCallback, AuthController.getAll);
		server.get(`/api/auth/check`, AuthController.verifyLogin);

		server.get(`/api/users/byID/:id`, AuthController.verifyCallback, AuthController.userController.getID);
		server.post(`/api/users/byEmail`, AuthController.verifyCallback, AuthController.findByEmail);
		server.post(`/api/users/changePass`, AuthController.verifyCallback, AuthController.changePassword);

		server.delete(`/api/users/:id`, AuthController.verifyCallback, AuthController.userController.delete);
		server.delete(`/api/auth/:id`, AuthController.verifyCallback, AuthController.delete);

		server.post(`/api/auth/create`, AuthController.register);
		server.post(`/api/auth/login`, AuthController.login);
		server.post(`/api/auth/logout`, AuthController.logout);
	}

}