module.exports.ProductSchema = `

    type NutritionValues{
        protein : String!
        calories : String!
        fats : String!
    }

    type Product {
        id : ID!
        productName : String!
        productPrice : Int!
        productDescription : String!
        productImage : String!
        nutritionalValues : NutritionValues!
    }
`