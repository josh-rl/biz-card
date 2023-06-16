import mongoose from "mongoose";

class Connection {
	constructor() {
		let url = process.env.MONGODB_URI || "";
		// if (url !== "") {
		// 	url = (url.replace(
		// 		"<username>",
		// 		process.env.DB_USER
		// 	)).replace(
		// 		"<password>",
		// 		process.env.DB_PASS
		// 	);
		// }
		let options = {
			dbName: process.env.DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true
		};
		mongoose.Promise = global.Promise;
		// mongoose.set("useNewUrlParser", true);
		// mongoose.set("useFindAndModify", false);
		// mongoose.set("useCreateIndex", true);
		// mongoose.set("useUnifiedTopology", true);
		mongoose.connect(url, options);
	}
}

export default new Connection();
