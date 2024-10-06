import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { firebase } from "../config/firebase";
import { FirebaseUserRequest } from "../types/firebase";

export const validateFirebaseAuthToken = async (
	req: FirebaseUserRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization;

	if (!token)
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.send({ message: "Unauthorized: No token provided" });

	try {
		const decodedUser = (await firebase
			.auth()
			.verifyIdToken(token)
			.then((user) => user)) as FirebaseUserRequest["user"];

		req.user = decodedUser;
		next();
	} catch (error) {
		console.error("Error while verifying Firebase ID token:", error);

		return res.status(StatusCodes.UNAUTHORIZED).send({ message: "Unauthorized: Invalid token" });
	}
};
