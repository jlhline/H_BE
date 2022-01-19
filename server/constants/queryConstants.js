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
    sortBy: "&sortBy=",
    direction: "&direction=",
    tag: "tag=",
  },
  apiString: "https://api.hatchways.io/assessment/blog/posts?",
};

module.exports = queryConstants;
