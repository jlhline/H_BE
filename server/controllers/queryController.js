const constants = require("../constants/queryConstants.js");
const { testTags } = require("../helpers/tagTester.js");
const queryController = {};
//Controller to validate incoming query parameters
queryController.validateQueries = (req, res, next) => {
  const { tags, sortBy, direction } = req.query;

  if (tags) {
    if (sortBy && !constants.sortBy.hasOwnProperty(sortBy)) {
      return next({ message: { error: "sortBy parameter is invalid" } });
    } else if (direction && !constants.direction.hasOwnProperty(direction)) {
      return next({ message: { error: "direction parameter is invalid" } });
    }

    res.locals.tags = testTags(tags);
    if (res.locals.tags.length !== tags.split(",").length) {
      return next({ message: { error: "Invalid tag format" } });
    }
    next();
  } else {
    return next({ message: { error: "Tags Parameter is required" } });
  }
};
//Controller to build a query string per tag
queryController.generateQueries = (req, res, next) => {
  if (res.locals.tags) {
    res.locals.queries = res.locals.tags.map((tag) => {
      let currString = constants.append.tag + tag;
      return constants.apiString + currString;
    });

    next();
  } else {
    return next({ message: { error: "Unable to generate query strings" } });
  }
};

module.exports = queryController;
