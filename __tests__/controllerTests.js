//const jest = require("jest");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const constants = require("../server/constants/queryConstants");
const queryController = require("../server/controllers/queryController.js");

describe("test validateQueries middleware", () => {
  test("tag words should only contain letters", async () => {
    const req = getMockReq({
      query: {
        tags: "tech",
      },
    });

    const { res, next } = getMockRes({
      locals: {},
    });

    await queryController.validateQueries(req, res, next);

    expect(res.json()).toMatchObject({
      locals: {
        tags: ["tech"],
      },
    });

    expect(next).toBeCalled();
  });
});
// const jest = require("jest");

// const tagTest = require("../server/helpers/tagTester.js");

// describe("test testTag function", () => {
//   it("tag words should only contain letters", () => {});
// });
