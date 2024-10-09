const UserSchema = `
    type User{
        id : ID!
        name : String!
        email : String!
        password : String!
        mobile : Int!
    }
`

module.exports = {UserSchema};