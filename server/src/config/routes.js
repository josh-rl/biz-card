const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

if (process.env.NODE_ENV === "production") {
	router.post(`/register`, AuthController.register);
	router.post(`/login`, AuthController.login);
	router.post(`/logout`, AuthController.logout);
}

else if (process.env.NODE_ENV === "development") {
	router.get(`/users/all`, AuthController.verifyCallback, AuthController.userController.getAll);
	router.get(`/auth/all`, AuthController.verifyCallback, AuthController.getAll);
	router.get(`/auth/check`, AuthController.verifyLogin);

	router.get(`/users/byID/:id`, AuthController.verifyCallback, AuthController.userController.getID);
	router.post(`/users/byEmail`, AuthController.verifyCallback, AuthController.findByEmail);
	router.post(`/users/changePass`, AuthController.verifyCallback, AuthController.changePassword);

	router.delete(`/users/:id`, AuthController.verifyCallback, AuthController.userController.delete);
	router.delete(`/auth/:id`, AuthController.verifyCallback, AuthController.delete);

	router.post(`/auth/create`, AuthController.register);
	router.post(`/auth/login`, AuthController.login);
	router.post(`/auth/logout`, AuthController.logout);
}

module.exports = router;
