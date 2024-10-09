const { ProductMutations } = require("./mutations");
const { ProductQueries } = require("./queries");
const { ProductResolvers } = require("./resolvers");
const { ProductSchema } = require("./schema");

const ProductServices = { ProductResolvers , ProductMutations , ProductQueries , ProductSchema};

module.exports = {ProductServices};