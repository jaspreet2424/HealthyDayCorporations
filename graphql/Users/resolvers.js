const { GraphQLError } = require("graphql");
const { UserServiceClass } = require("./userServiceClasses");

const queries = {
    async getAllUsers(parent , context){
        const UserToken = await context.authentication();
        if(!UserToken){
            throw new GraphQLError("Unauthorized Access. Please Login First" , {
                extensions : {
                    code : 'UNAUTHORISED'
                }
            })
        }
        return 'All users data fetched successfully';
    }
}

const mutations = {
    async createNewUser({name , email , password}){
        const response = UserServiceClass.createUser({name , email , password});
        return response;
    },

    async verifyUser({email , otp}){
        const response = UserServiceClass.OTPVerification({email , otp});
        return response;
    },

    async resendOTP({email}){
        const response = UserServiceClass.resendOTPMethod({email});
        return response;
    },

    async loginUser({email , password}){
        const response = UserServiceClass.loginUser({email , password});
        return response;
    }
}

const UserResolver = {queries , mutations};

module.exports = {UserResolver};