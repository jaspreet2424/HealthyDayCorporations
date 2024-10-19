const { ProductServiceClass } = require("./ProductServiceClasses");

const queries = {
  message() {
    return "Hey Message query is successfull";
  },

  async getAllProducts() {
    const response = await ProductServiceClass.fetchAllProductsData();
    return response;
  },

  async getSingleProduct({id}){
    const response = await ProductServiceClass.getSingleProductByID(id);
    return response;
  }
};

const mutations = {};

const ProductResolvers = { queries, mutations };

module.exports = { ProductResolvers };
