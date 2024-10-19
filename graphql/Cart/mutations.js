const CartMutations = `
    addToCart(productId : ID! , quantity : Int!) : String!
    updateQuantity(id : ID! , quantity : Int!) : String!
`;

module.exports = {
  CartMutations,
};
