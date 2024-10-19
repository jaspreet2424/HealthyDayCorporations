const { GraphQLError } = require("graphql");
const { CartModel } = require("../../modals/Cart");
const { ProductModel } = require("../../modals/Products");
const { userModel } = require("../../modals/User");

const modals = {
  userDatabaseModel: userModel,
  cartDatabaseModel: CartModel,
  productDatabaseModel: ProductModel,
};

class CartServiceClass {
  static async addToCartMethod({ userId, productId, quantity }) {
    const isCart = await modals.cartDatabaseModel.findOne({
      userId: userId.toString(),
    });
    const isProduct = await modals.productDatabaseModel.findById(productId);

    if (!isProduct) {
      throw new GraphQLError("Selected item not Found!", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    if (!isCart) {
      await modals.cartDatabaseModel.create({
        userId: userId,
        cartItems: new Array({ productId: productId, quantity: quantity }),
      });

      return "New Cart Item added successfully";
    }

    const existingProduct = isCart.cartItems.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingProduct) {
      throw new GraphQLError("Item is already present in the cart", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    isCart.cartItems.push({ productId: productId, quantity: quantity });

    await isCart.save();

    return "Item Added successfully";
  }

  static async changeQuantityMethod({ userId, cartItemId, quantity }) {
    const isCart = await modals.cartDatabaseModel.findOne({
      userId: userId.toString(),
    });

    if (!isCart) {
      throw new GraphQLError("Cart is Empty!", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    const updatedCart = await modals.cartDatabaseModel.findOneAndUpdate(
      { _id: isCart._id, "cartItems._id": cartItemId },
      { $set: { "cartItems.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      throw new GraphQLError("Failed to Update Quantity!", {
        extensions: {
          code: "INTERNAL_SERVER_ERROR",
        },
      });
    }

    return "Quantity Updated Successfully";
  }

  static async deleteCartItemMethod({ userId, cartItemId }) {
    const isCart = await modals.cartDatabaseModel.findOne({
      userId: userId.toString(),
    });

    if (!isCart) {
      throw new GraphQLError("Cart is Empty!", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    }

    //wrong logic
    const deletedItem = await modals.cartDatabaseModel.findOneAndDelete({
      _id: isCart._id,
      "cartItems._id": cartItemId,
    });

    console.log(deletedItem);

    return "Item Deleted Successfully";
  }

  static async fetchAllCartItems({ userId }) {
    const isCart = await modals.cartDatabaseModel.findOne({
      userId: userId.toString(),
    });

    if(isCart.cartItems.length === 0){
      throw new GraphQLError("Cart is Empty!" , {
        extensions : {
          code : "BAD_REQUEST",
        }
      })
    }

    const cartIemsPromises = isCart.cartItems.map(async (item) => {
      const product = await modals.productDatabaseModel.findById(
        item.productId
      );

      return product;
    });

    const cartItems = await Promise.all(cartIemsPromises);

    return cartItems;
  }
}

module.exports = {
  CartServiceClass,
};
