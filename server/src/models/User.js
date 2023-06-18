const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const ROUNDS = 10;

class User {
	initSchema() {
		const userSchema = new Schema({
			first_name: {
				type: String,
				required: true
			},
			last_name: {
				type: String,
				required: true
			},
			email: {
				type: String,
				required: true,
				unique: true
			},
			pass: {
				type: String,
				required: true
			}
		}, { timestamps: true, collection: process.env.USERS_DB_COL });

		userSchema.pre("save", async function() {
			return new Promise((resolve, reject) => {
				if (this.isNew || this.isModified("pass")) {
					bcrypt.hash(this.pass, ROUNDS, (error, hashedPass) => {
						if (error) {
							reject(error);
						} else {
							this.pass = hashedPass;
							resolve();
						}
					});
				} else {
					resolve();
				}
			});
		});

		userSchema.methods.saltHashSet = async function(newPass) {
			return new Promise((resolve, reject) => {
				bcrypt.hash(newPass, ROUNDS, (error, result) => {
					if (error) {
						reject(error);
					} else {
						this.pass = result;
						resolve(true);
					}
				});
			});
		};

		userSchema.methods.comparePassword = async function(reqPass) {
			return new Promise((resolve, reject) => {
				bcrypt.compare(reqPass, this.pass, (error, result) => {
					if (error) {
						reject(error);
					} else {
						resolve(result);
					}
				});
			});
		};

		userSchema.plugin(uniqueValidator);
		mongoose.model(process.env.USERS_DB_COL, userSchema);
	}

	getInstance() {
		this.initSchema();
		return mongoose.model(process.env.USERS_DB_COL);
	}
}

module.exports = { User };
