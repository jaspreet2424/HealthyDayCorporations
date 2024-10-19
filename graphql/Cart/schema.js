const CartSchema = `

    type CartItems {
        id : ID!
        productId : ID!
        quantity : Int!
    }

    type Cart {
        userId : ID!
        items : [CartItems]
    }
`;

module.exports = { CartSchema };