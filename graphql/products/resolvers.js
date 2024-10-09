const { thumbnailUpload } = require("./ScalarTypes")

const queries = {
    message(){
        return "Hey Message query is successfull"
    }
}

const mutations = {
    Date : thumbnailUpload,

    addProduct({name , price , description , createdDate}){

        const Product = {
            id : Date.now(),
            name,
            price,
            description,
            createdDate,
        }

        return Product;
    }
}

const ProductResolvers = {queries , mutations};

module.exports = {ProductResolvers};