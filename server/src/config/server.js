const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const server = express();
const apiRoutes = require("./routes");

server.use(bodyParser.json());
server.use(cookieParser());

if (process.env.NODE_ENV === "production") {
	server.use(cors({
		origin: ["https://joshrlaw.dev", "*"],
		credentials: true
	}));
}
else if (process.env.NODE_ENV === "development") {
	server.use(cors({
		origin: ["http://localhost:3000", "*"],
		credentials: true
	}));
}

server.use('/api', apiRoutes);

module.exports = { server };
