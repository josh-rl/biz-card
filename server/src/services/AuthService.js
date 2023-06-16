import mongoose from "mongoose";
import Service from "./Service.js";
// import * as jwt from "jsonwebtoken";
// import { sign, verify, decode } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import * as httpRes from "../helpers/httpResponses.js";

class AuthService extends Service {
	constructor(authModel, userModel) {
		super(authModel);
		this.userService = new Service(userModel);
		this.findByEmail = this.findByEmail.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
	}

	async findByEmail(email, includePass = false) {
		try {
			let user;
			if (includePass === true) {
				user = await this.userService.model.findOne({
					email: email
				});
			} else if (includePass === false) {
				user = await this.userService.model.findOne({
					email: email
				}, {
					pass: 0
				});
			}
			if (!user) {
				return httpRes.emailNotFound();
			}
			return httpRes.findSuccess(user);
		} catch (error) {
			return httpRes.serverError(error.message);
		}
	}

	async login(email, pass) {
		try {
			// check if email exists
			const user = await this.userService.model.findOne({email: email});
			if (!user) {
				return httpRes.emailNotFound();
			}
			const existingClient = await this.model.findOne({user: user._id});
			if (existingClient) {
				await this.model.deleteOne(existingClient);
			}
			// check if given password matches user password
			const passMatch = await user.comparePassword(pass);
			if (!passMatch) {
				return httpRes.passwordMismatch();
			}
			// create authentication token
			const token = await this.generateToken(user);
			if (!token) {
				return httpRes.serverFailure("Token could not be generated.");
			}
			// create client record
			const dbToken = await this.model.create({
				token: token,
				user: new mongoose.mongo.ObjectId(user._id)
			});
			if (!dbToken) {
				return httpRes.serverFailure("Authorization could not be granted.");
			}
			return httpRes.createSuccess(dbToken);
			// return httpRes.createSuccess("Authorization granted.");

			// join user to client table (might not be needed)
			const populatedToken = await dbToken.populate({
				path: "user"
			});
			if (!populatedToken) {
				return httpRes.serverFailure("Token could not be linked to user.");
			}
			return httpRes.createSuccess(populatedToken);

		} catch (error) {
			return httpRes.serverError(error.message);
		}
	}

	async register(data) {
		try {
			const newUser = await this.userService.insert(data);
			if (!newUser) {
				return httpRes.createFailure(data);
			}
			return httpRes.createSuccess("User created successfully.");
		} catch (error) {
			return httpRes.serverError(error.message);
		}
	}

	async logout(uid) {
		try {
			const client = await this.model.findOne({user: uid});
			if (!client) {
				return httpRes.tokenNotFound();
			}
			const deleteRes = await this.model.deleteOne(client);
			if (!deleteRes) {
				return httpRes.tokenNotFound();
			}
			return httpRes.deleteSuccess("Logged out successfully.");
		} catch (error) {
			return httpRes.serverError(error.message);
		}
	}

	async changePassword(id, newPass) {
		try {
			const user = await this.userService.model.findById(id);
			if (!user) {
				return httpRes.idNotFound();
			}
			const passwordSet = await user.saltHashSet(newPass);
			if (!passwordSet) {
				return httpRes.updateFailure(id, "None.");
			}
			return httpRes.updateSuccess("Password set.");
		} catch (error) {
			return httpRes.serverError(error.message);
		}
	}

	async checkLogin(cookies) {
		try {
			if (!cookies["public"] || !cookies["private"]) {
				return httpRes.authenticationDenied("Cookies not found.");
			}
			// parse token from cookies
			const pubCookie = JSON.parse(cookies["public"]);
			const privCookie = JSON.parse(cookies["private"]);
			const payload = pubCookie.payload;
			const header = privCookie.header;
			const signature = privCookie.signature;
			const token = header+'.'+payload+'.'+signature;
			// check if token verifies: expired, non-auth
			const decoded = await this.verifyToken(token);
			if (!decoded) {
				return httpRes.authenticationDenied("Token could not be verified.");
			}
			// check if token and encoded user exists in client table
			const dbToken = await this.model.findOne({ token: token, user: decoded._id });
			if (!dbToken) {
				return httpRes.authenticationDenied("Token not found in client table.");
			}
			// check if encoded user exists in user table
			const tokenUserCheck = await this.userService.getID(decoded._id);
			if (!tokenUserCheck) {
				return httpRes.authenticationDenied("Token doesn't match to existing user.");
			}
			return httpRes.authenticationSuccess();
		} catch (error) {
			if (error.name) {
				if (error.name === "TokenExpiredError") {
					return httpRes.tokenExpired();
				}
				if (error.name === "JsonWebTokenError") {
					return httpRes.authenticationDenied(error.message);
				}
			}
			return httpRes.serverError(error.message);
		}
	}

	async generateToken(user) {
		return new Promise((resolve, reject) => {
			jwt.sign(
			// sign(
				{
					_id: user._id.toString(),
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email
				},
				Buffer.from(process.env.JWT_SECRET , 'base64').toString('ascii'),
				{
					// issuer: process.env.JWT_ISSUER,
					// subject: process.env.JWT_SUBJECT,
					// audience: process.env.JWT_AUDIENCE,
					expiresIn: process.env.JWT_EXP,
					algorithm: process.env.JWT_ALGO
				},
				(error, encoded) => {
					if (error) reject(error);
					else resolve(encoded);
				}
			);
		});
	}

	async verifyToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(
			// verify(
				token, 
				Buffer.from(process.env.JWT_PUBLIC , 'base64').toString('ascii'),
				{
					// issuer: process.env.JWT_ISSUER,
					// subject: process.env.JWT_SUBJECT,
					// audience: process.env.JWT_AUDIENCE,
					expiresIn: process.env.JWT_EXP,
					algorithm: process.env.JWT_ALGO
				},
				(error, decoded) => {
					if (error) reject(error);
					else resolve(decoded);
				}
			);
		});
	}

	async decodeToken(token) {
		return new Promise((resolve, reject) => {
			jwt.decode(
			// decode(
				token,
				(error, decoded) => {
					if (error) reject(error);
					else resolve(decoded);
				}
			);
		});
	}
}

export default AuthService;
