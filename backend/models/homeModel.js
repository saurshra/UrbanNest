const mongoose = require("mongoose");

const addHomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  views:{
    type:String,
    required:true
  },
  amenities: {
    type: String,
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
});

const addHome = mongoose.model("homes", addHomeSchema);
module.exports = addHome;
