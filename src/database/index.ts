import { connect } from "mongoose";

const { MONGODB_URI, MONGODB_URI_TEST, MONGODB_NAME, MONGODB_NAME_TEST, NODE_ENV } = process.env;

if (!MONGODB_URI || !MONGODB_URI_TEST || !MONGODB_NAME || !MONGODB_NAME_TEST || !NODE_ENV) {
	throw new Error("Missing environment variables");
}

const uri = NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI;
const name = NODE_ENV === "test" ? MONGODB_NAME_TEST : MONGODB_NAME;

export const connectDB = (async () => {
	await connect(uri, { dbName: name })
		.then(() => {
			console.log(`Connected to MongoDB ${name}`);
		})
		.catch((error) => {
			console.error(error);
			process.exit(1);
		});
})();
