const supertest = require("supertest");
const server = require("../server/server.js");

beforeAll(() => jest.setTimeout(5 * 1000));

//API ROUTES
describe("apiRouter", () => {
  //PING TEST

  //TEST FOR PING
  test("GET /api/ping", (done) => {
    supertest(server)
      .get("/api/ping")
      .expect(200, JSON.stringify({ success: true }))
      .end(done);
  });

  //GET REQUEST WITH ONE TAG(WRITE A FEW ERROR CHECKS)
  //3 METHODS

  //
});

afterAll((done) => {
  //server.close();
  done();
});
