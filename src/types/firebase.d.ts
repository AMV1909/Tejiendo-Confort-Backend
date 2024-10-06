import { Request } from "express";

export interface FirebaseUser {
	iss: string;
	aud: string;
	auth_time: number;
	user_id: string;
	sub: string;
	iat: number;
	exp: number;
	email: string;
	email_verified: boolean;
	firebase: {
		identities: {
			email: string[];
		};
		sign_in_provider: string;
	};
	uid: string;
}

export interface FirebaseUserRequest extends Request {
	user?: FirebaseUser;
}
