const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Products",
  },

  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  cartItems: [cartItemsSchema],
});

const CartModel = new mongoose.model("CartCollection", cartSchema);

module.exports = {
  CartModel,
};
