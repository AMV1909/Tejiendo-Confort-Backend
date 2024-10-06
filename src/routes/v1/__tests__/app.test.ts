import request from "supertest";

import { StatusCodes } from "http-status-codes";
import { app } from "../../../app";

describe("GET /health", () => {
	it("should return 200 and health check object", async () => {
		const response = await request(app).get("/health");

		expect(response.status).toBe(StatusCodes.OK);
		expect(response.body).toHaveProperty("uptime");
		expect(response.body).toHaveProperty("message", "OK");
		expect(response.body).toHaveProperty("timestamp");
	});
});
