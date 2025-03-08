const request = require("supertest");
const { app, validateEmployee, validateCompany } = require("../index.js");

const http = require("http");

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints to add data", () => {
  it("should add a new employee with valid input", async () => {
    const res = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe", companyId: 1 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ id: 1, name: "John Doe", companyId: 1 });
  });

  it("should add a new employee with invalid input", async () => {
    const res = await request(server)
      .post("/api/employees")
      .send({ name: "John Doe" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("companyId is required and should be Integere");
  });

  it("should add a new company with valid input", async () => {
    const res = await request(server)
      .post("/api/companies")
      .send({ name: "TechCorp" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ id: 1, name: "TechCorp" });
  });
  it("should add a new company with invalid input", async () => {
    const res = await request(server).post("/api/companies").send({ id: 1 });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("name is required and should be string");
  });
});

describe("Validation Function", () => {
  it("should validate employee input correctly", async () => {
    const res = { name: "John Doe", companyId: 1 };
    const result = await validateEmployee(res);
    expect(result).toBeNull();
  });
  it("should validate return invalid employee input", async () => {
    expect(
      validateEmployee({ name: "John Doe", companyId: 1 }),
    ).resolves.toBeNull();
    expect(validateEmployee({ name: "John Doe" })).resolves.toEqual(
      "companyId is required and should be Integere",
    );
    expect(validateEmployee({ companyId: 1 })).resolves.toEqual(
      "name is required and should be string",
    );
  });

  it("should validate company input correctly", async () => {
    const res = { name: "TechCorp" };
    const result = await validateCompany(res);
    expect(result).toBeNull();
  });
  it("should validate return invalid company input", async () => {
    expect(validateCompany({ name: "TechCorp" })).resolves.toBeNull();
    expect(validateCompany({ id: 1 })).resolves.toEqual(
      "name is required and should be string",
    );
  });
});
