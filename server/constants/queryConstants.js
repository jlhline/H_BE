//These are the constants to check incoming queries against
//As well as constants for the api query
const queryConstants = {
  sortBy: {
    id: true,
    reads: true,
    likes: true,
    popularity: true,
  },
  direction: {
    asc: true,
    desc: true,
  },
  append: {
    tag: "tag=",
  },
  apiString: "https://api.hatchways.io/assessment/blog/posts?",
};

module.exports = queryConstants;
