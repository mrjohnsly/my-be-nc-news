const app = require("../app/app.js");

app.listen(9090, (error) => {
	if (error) { console.log("Error starting the server."); }
	console.log("Server running on PORT 9090...");
});