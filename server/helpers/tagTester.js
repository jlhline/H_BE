const tagTester = {};

tagTester.testTags = (string) => {
  let onlyLetters = /^[A-Za-z]+$/;
  let tags = string.split(",");

  return tags.filter((tag) => {
    return onlyLetters.test(tag);
  });
};

module.exports = tagTester;
