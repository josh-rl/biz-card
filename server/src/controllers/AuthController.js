import Controller from "./Controller.js";
import AuthService from "../services/AuthService.js";
import User from "../models/User.js";
import Auth from "../models/Auth.js";

const authService = new AuthService(
	new Auth().getInstance(),
	new User().getInstance()
);

class AuthController extends Controller {
	constructor(authService) {
		super(authService);
		this.userController = new Controller(this.service.userService);
		this.findByEmail = this.findByEmail.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.verifyCallback = this.verifyCallback.bind(this);
		this.verifyLogin = this.verifyLogin.bind(this);
	}

	async findByEmail(req, res, next) {
		try {
			const { email, includePass } = req.body;
			const response = await this.service.findByEmail(email, includePass);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, pass } = req.body;
			await this.service.login(email, pass).then(
			async (response) => {
				if (response.statusCode === 201) {
					const token = String(response.data.token);
					const header = token.split('.')[0];
					const payload = token.split('.')[1];
					const signature = token.split('.')[2];
					response.data = "Login successful.";
					await res.cookie(
						"public",
						JSON.stringify({
							payload: payload
						}),
						{
							path: "/",
							domain: process.env.JWT_COOKIE_DOMAIN,
							expires: new Date(Date.now() + Number(process.env.JWT_MS_EXP)),
							secure: false,
							httpOnly: false,
							sameSite: false,
						}
					).cookie(
						"private",
						JSON.stringify({
							header: header,
							signature: signature
						}),
						{
							path: "/",
							domain: process.env.JWT_COOKIE_DOMAIN,
							expires: new Date(Date.now() + Number(process.env.JWT_MS_EXP)),
							secure: false,
							httpOnly: true,
							sameSite: false
						}
					).status(response.statusCode).json(response);
				} else {
					await res.status(response.statusCode).json(response)
				}
			}, 
			async (error) => {
				next(error);
			}
			);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async register(req, res, next) {
		try {
			const response = await this.service.register(req.body);
			// TODO:
			// create short exp 'recently registered' cookie
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { uid } = req.body;
			await this.service.logout(uid).then(
			async (response) => {
				await res.clearCookie("public");
				await res.clearCookie("private");
				await res.status(response.statusCode).json(response);
			}, 
			async (error) => {
				next(error);
			});
			// next();
		} catch (error) {
			next(error);
		}
	}

	async changePassword(req, res, next) {
		try {
			const { id, newPass } = req.body;
			const response = await this.service.changePassword(id, newPass);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async verifyCallback(req, res, next) {
		try {
			await this.service.checkLogin(req.cookies).then(
			async (response) => {
				if (response.success === true) {
					next();
				} else {
					await res.clearCookie("public");
					await res.clearCookie("private");
					await res.status(response.statusCode).json(response);
				}
			}, 
			async(error) => {
				next(error);
			});
		} catch (error) {
			next(error);
		}
	}

	async verifyLogin(req, res, next) {
		try {
			await this.service.checkLogin(req.cookies).then(
			async (response) => {
				if (response.success === true) {
					await res.status(response.statusCode).json(response);
				} else {
					await res.clearCookie("public");
					await res.clearCookie("private");
					await res.status(response.statusCode).json(response);
				}
			}, 
			async(error) => {
				next(error);
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController(authService);
