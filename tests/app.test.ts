import request from "supertest";
import app from "../src/";
import server from "..";

const Request = () => request(app);

afterAll(async () => {
    await server.close();
    //  new Promise<void>((resolve) => {
    //     server.close(() => {
    //         resolve();
    //     });
    // });
});

describe("Test Express Routes", () => {
    it("GET / should return Hello World!", async () => {
        const req = Request();
        const res = await req.get("/api/users");
        const data = JSON.parse(res.text);

        expect(res.statusCode).toEqual(201);
        expect(data?.data?.toLowerCase()).toEqual("Hello World".toLowerCase());
    });
    // Add more tests for other routes here
});
