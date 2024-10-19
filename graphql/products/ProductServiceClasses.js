const { GraphQLError } = require("graphql");
const { ProductModel } = require("../../modals/Products");

const modals = {
  healthyDayProductModal: ProductModel,
};

class ProductServiceClass {
  static async fetchAllProductsData() {
    const products = await modals.healthyDayProductModal.find();

    if (!products || products.length < 0) {
      throw new GraphQLError("Failed to fetch Data. Something went wrong", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }

    return products;
  }

  static async getSingleProductByID(id) {
    const product = await modals.healthyDayProductModal.findById(id);

    if (!product) {
      throw new GraphQLError("Failed to fetch Data. Something went wrong", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }

    return product;
  }
}

module.exports = {
  ProductServiceClass,
};
