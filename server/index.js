require("dotenv").config();
require("./src/config/database");
const { server } = require("./src/config/server");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
