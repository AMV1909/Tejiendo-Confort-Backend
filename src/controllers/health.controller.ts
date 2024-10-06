import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const healthCheck = async (_req: Request, res: Response) => {
	const healthCheck = {
		uptime: process.uptime(),
		message: "OK",
		timestamp: Date.now(),
	};

	try {
		res.status(StatusCodes.OK).json(healthCheck);
	} catch (error) {
		healthCheck.message = (error as Error).message;
		res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ healthCheck });
	}
};
