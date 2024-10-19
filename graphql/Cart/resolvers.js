const { CartServiceClass } = require("./CartServicesClasses");

const queries = {
  async showCartItems(parent ,context) {
    const User = await context.authentication();
    if (!User) {
      throw new GraphQLError("Unauthorized Access. Please Login First", {
        extensions: {
          code: "UNAUTHORISED",
        },
      });
    }
    const response = await CartServiceClass.fetchAllCartItems({userId : User._id});
    return response;
  },

  async deleteCartItem({ id }, context) {
    const User = await context.authentication();
    if (!User) {
      throw new GraphQLError("Unauthorized Access. Please Login First", {
        extensions: {
          code: "UNAUTHORISED",
        },
      });
    }

    const response = await CartServiceClass.deleteCartItemMethod({
      userId: User._id,
      cartItemId: id,
    });

    return response;
  },
};

const mutations = {
  async addToCart({ productId, quantity }, context) {
    const User = await context.authentication();
    if (!User) {
      throw new GraphQLError("Unauthorized Access. Please Login First", {
        extensions: {
          code: "UNAUTHORISED",
        },
      });
    }

    const response = await CartServiceClass.addToCartMethod({
      userId: User._id,
      productId,
      quantity,
    });

    return response;
  },

  async updateQuantity({ id, quantity }, context) {
    const User = await context.authentication();
    if (!User) {
      throw new GraphQLError("Unauthorized Access. Please Login First", {
        extensions: {
          code: "UNAUTHORISED",
        },
      });
    }

    const response = await CartServiceClass.changeQuantityMethod({
      userId: User._id,
      cartItemId: id,
      quantity,
    });

    return response;
  },
};

const CartResolver = { mutations, queries };

module.exports = { CartResolver };
