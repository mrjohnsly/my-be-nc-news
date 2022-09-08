const app = require("../app/app.js");

const { PORT = 9090 } = process.env;

app.listen(PORT, (error) => {
	if (error) { console.log("Error starting the server."); }
	console.log(`Server running on PORT ${PORT}...`);
});