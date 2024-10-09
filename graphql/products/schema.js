module.exports.ProductSchema = `
    scalar Date

    type Product {
        id : ID!
        name : String!
        price : Int!
        description : String!
        createdDate : Date!
    }
`