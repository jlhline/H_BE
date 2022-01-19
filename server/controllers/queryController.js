const constants = require("../constants/queryConstants.js");
const { testTags } = require("../helpers/tagTester.js");
const queryController = {};

queryController.validateQueries = (req, res, next) => {
  const { tags, sortBy, direction } = req.query;

  if (tags) {
    if (sortBy && !constants.sortBy.hasOwnProperty(sortBy)) {
      return next({ error: "sortBy parameter is invalid" });
    } else if (direction && !constants.direction.hasOwnProperty(direction)) {
      return next({ error: "direction parameter is invalid" });
    }

    res.locals.tags = testTags(tags);
    next();
  } else {
    return next({ error: "Tags Parameter is required" });
  }
};

queryController.generateQueries = (req, res, next) => {
  const { sortBy, direction } = req.query;

  if (res.locals.tags) {
    res.locals.queries = res.locals.tags.map((tag) => {
      let currString = constants.append.tag + tag;
      if (sortBy) currString += constants.append.sortBy + sortBy;
      if (direction) currString += constants.append.direction + direction;
      return constants.apiString + currString;
    });

    next();
  } else {
    return next({ error: "Unable to generate query strings" });
  }
};

module.exports = queryController;
