import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import router from "./routes.js";

const server = express();

server.use(bodyParser.json());
server.use(cookieParser());

if (process.env.NODE_ENV === "production") {
	server.use(cors({
		origin: ["https://joshrlaw.dev"],
		credentials: true
	}));
}
else if (process.env.NODE_ENV === "development") {
	server.use(cors({
		origin: ["http://localhost:3000", "*"],
		credentials: true
	}));
}

router(server);

export default server;
