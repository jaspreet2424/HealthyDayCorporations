const { UserMutations } = require("./mutations");
const { UserQueries } = require("./queries");
const { UserResolver } = require("./resolvers");
const { UserSchema } = require("./schema");

const UserServices = {UserQueries , UserResolver , UserMutations , UserSchema};

module.exports = {UserServices};