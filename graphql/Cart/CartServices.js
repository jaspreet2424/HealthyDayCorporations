const { CartMutations } = require("./mutations");
const { CartQueries } = require("./queries");
const { CartResolver } = require("./resolvers");
const { CartSchema } = require("./schema");

const CartService = { CartMutations, CartResolver, CartSchema, CartQueries };

module.exports = { CartService };
