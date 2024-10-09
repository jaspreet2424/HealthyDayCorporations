const { UserServiceClass } = require("./userServiceClasses");

const queries = {
    getAllUsers(){
        return 'All users data fetched successfully';
    }
}

const mutations = {
    async createNewUser({name , email , password}){
        const res = UserServiceClass.createUser({name , email , password});
        return res;
    },

    async verifyUser({email , otp}){
        const res = UserServiceClass.OTPVerification({email , otp});
        return res;
    },

    async resendOTP({email}){
        const res = UserServiceClass.resendOTPMethod({email});
        return res;
    },

    async loginUser({email , password}){
        const res = UserServiceClass.loginUser({email , password});

        return res;
    }
}

const UserResolver = {queries , mutations};

module.exports = {UserResolver};