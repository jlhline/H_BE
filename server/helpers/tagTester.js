const tagTester = {};
//Simple example of a way to test a tag for only letters
//can be expanded to be more robust
tagTester.testTags = (string) => {
  let onlyLetters = /^[A-Za-z]+$/;
  let tags = string.split(",");

  return tags.filter((tag) => {
    return onlyLetters.test(tag);
  });
};

module.exports = tagTester;
