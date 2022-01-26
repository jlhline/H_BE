const supertest = require("supertest");
const server = require("../server/server.js");

beforeAll(() => {
  jest.setTimeout(10 * 1000);
});

//API ROUTES
describe("apiRouter", () => {
  //PING TEST

  // Ping Test
  test("GET /api/ping", (done) => {
    supertest(server)
      .get("/api/ping")
      .expect(200, JSON.stringify({ success: true }))
      .end(done);
  });
  // No Tag Specified
  test("GET /api/posts with no tag", (done) => {
    supertest(server)
      .get("/api/posts?tags=")
      .expect(400, JSON.stringify({ error: "Tags Parameter is required" }))
      .end(done);
  });
  // Invalid tag(numbers in it)
  test("GET /api/posts with invalid tag format", (done) => {
    supertest(server)
      .get("/api/posts?tags=science4")
      .expect(400, JSON.stringify({ error: "Invalid tag format" }))
      .end(done);
  });
  // No sortby and direction specified
  test("GET /api/posts?tags=science", (done) => {
    supertest(server).get("/api/posts?tags=science").expect(200).end(done);
  });
  // Multiple tags
  test("GET /api/posts?tags=science", (done) => {
    supertest(server)
      .get("/api/posts?tags=science,history")
      .expect(200)
      .end(done);
  });
  // Invalid sortby
  test("GET /api/posts?tags=science", (done) => {
    supertest(server)
      .get("/api/posts?tags=science&sortBy=h")
      .expect(400, JSON.stringify({ error: "sortBy parameter is invalid" }))
      .end(done);
  });
  // Invalid direction
  test("GET /api/posts?tags=science", (done) => {
    supertest(server)
      .get("/api/posts?tags=science&sortBy=likes&direction=h")
      .expect(400, JSON.stringify({ error: "direction parameter is invalid" }))
      .end(done);
  });
  // Valid sortby no direction
  test("GET /api/posts?tags=science", (done) => {
    supertest(server)
      .get("/api/posts?tags=science&sortBy=likes")
      .expect(200)
      .end(done);
  });
  // Valid direction no sortby
  test("GET /api/posts?tags=science", (done) => {
    supertest(server)
      .get("/api/posts?tags=science&direction=asc")
      .expect(200)
      .end(done);
  });
});

afterAll((done) => {
  done();
});
