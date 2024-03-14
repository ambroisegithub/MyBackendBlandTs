import supertest from "supertest";
import { app, server, connectToDatabase } from "./index.test";

const request = supertest(app);

describe("GET /", () => {
  beforeAll(async () => {
    await connectToDatabase(); 
  });

  afterAll((done) => {
    server.close(done);
  });

  it("responds with JSON message", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Welcome To My portfolio API" });
  });
});
