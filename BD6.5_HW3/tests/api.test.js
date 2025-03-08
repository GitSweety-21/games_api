const request = require("supertest");

const { app, validateArticle, validateAuthor } = require("../index.js");

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
  it("should add a new articles with valid input", async () => {
    const res = await request(server).post("/articles").send({
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      id: 3,
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    });
  });
  it("should add a articles with invalid input", async () => {
    const res = await request(server).post("/articles").send({
      content: "Node.js is a powerful tool for backend development...",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("title is required and should be string");
  });
  it("should add a new author with valid input", async () => {
    const res = await request(server)
      .post("/authors")
      .send({ name: "Alice Johnson", articleId: 3 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ id: 3, name: "Alice Johnson", articleId: 3 });
  });
  it("should add a author with invalid input", async () => {
    const res = await request(server)
      .post("/authors")
      .send({ name: "Alice Johnson" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual("articleId is required and should be Integer");
  });
});

describe("Validation functions", () => {
  it("should validate articles input correcly", async () => {
    const res = {
      title: "Mastering Node.js",
      content: "Node.js is a powerful tool for backend development...",
    };
    const result = await validateArticle(res);
    expect(result).toBeNull();
  });
  it("should validate return invalid article input", async () => {
    expect(
      validateArticle({
        title: "Mastering Node.js",
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).resolves.toBeNull();
    expect(
      validateArticle({
        content: "Node.js is a powerful tool for backend development...",
      }),
    ).resolves.toEqual("title is required and should be string");
    expect(validateArticle({ title: "Mastering Node.js" })).resolves.toEqual(
      "content is required and should be string",
    );
  });
  it("should validate author input correcly", async () => {
    const res = { name: "Alice Johnson", articleId: 3 };
    const result = await validateAuthor(res);
    expect(result).toBeNull();
  });
  it("should validate return invalid author input", async () => {
    expect(
      validateAuthor({ name: "Alice Johnson", articleId: 3 }),
    ).resolves.toBeNull();
    expect(validateAuthor({ name: "Alice Johnson" })).resolves.toEqual(
      "articleId is required and should be Integer",
    );
    expect(validateAuthor({ articleId: 3 })).resolves.toEqual(
      "name is required and should be string",
    );
  });
});
