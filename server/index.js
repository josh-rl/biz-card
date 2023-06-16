import "./src/config/config.js";
import "./src/config/database.js";
import server from "./src/config/server.js";

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
