const CartQueries = `
    showCartItems : [Product]!
    deleteCartItem(id : ID!) : String!
`;

module.exports = { CartQueries };
