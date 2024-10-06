import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateQueryData<T extends ZodTypeAny>(schema: T) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			req.query = schema.parse(req.query);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));

				res
					.status(StatusCodes.BAD_REQUEST)
					.json({ error: "Invalid query data", details: errorMessages });
			} else {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
			}
		}
	};
}
