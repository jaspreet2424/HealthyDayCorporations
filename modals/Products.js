const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({} , {strict : false});

const ProductModel = new mongoose.model("MyProducts" , ProductSchema , "Products");

module.exports = {
    ProductModel
}