const mongoose = require("mongoose");

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
		mongoose.Promise = global.Promise;
		mongoose.connect(url, {
			dbName: process.env.DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(
			() => {console.log("Connected to database at URL:", url);},
			() => {console.log("Could not connect to database at URL:", url);}
		);
	}
}

module.exports = new Connection();
