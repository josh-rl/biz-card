import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Auth {
	initSchema() {
		const authSchema = new Schema({
			token: {
				type: String,
				required: true
			},
			user: {
				type: Schema.Types.ObjectId,
				required: true,
				unique: true,
				ref: process.env.USERS_DB_COL
			},
			// expireAt: {
			// 	type: Date,
			// 	default: new Date(Date.now() + Number(process.env.JWT_MS_EXP)),
			// 	expireAfterSeconds: 0
			// }
		}, { timestamps: true, collection: process.env.AUTH_DB_COL });

		authSchema.plugin(uniqueValidator);
		mongoose.model(process.env.AUTH_DB_COL, authSchema);
	};

	getInstance() {
		this.initSchema();
		return mongoose.model(process.env.AUTH_DB_COL);
	}
}

export default Auth;
