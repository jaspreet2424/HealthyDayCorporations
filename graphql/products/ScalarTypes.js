const { GraphQLScalarType } = require("graphql");

const thumbnailUpload = new GraphQLScalarType({
  name: "Date",
  description: "Date type",
  serialize(value) {
    console.log(value)
  },
});

module.exports = {thumbnailUpload};