const UserMutations = `
    createNewUser(name : String! , email : String! , password : String!) : String!
    verifyUser(email : String! , otp : Int!) : String!
    resendOTP(email : String!) : String!
    loginUser(email : String! , password : String!) : String!
`

module.exports = {UserMutations};