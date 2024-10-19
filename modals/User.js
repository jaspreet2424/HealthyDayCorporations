const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    default: null,
  },
  userVerified : {
    type : Boolean,
    default : false,
  },
  token : {
    type : String,
    default : null,
  }
});

const userModel = new mongoose.model("Users", userSchema);

module.exports = {
  userModel,
};
