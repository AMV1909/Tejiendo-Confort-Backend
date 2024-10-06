import { app } from "./app";
import "./database";

// Start server
app.listen(app.get("port"), () => {
	console.log(`Server on port ${app.get("port")}`);
});
