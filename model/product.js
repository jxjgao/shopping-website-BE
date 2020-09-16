const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
   title: String,
   image: String,
   description: String,
   price: Number,
   category: String
});
 
module.exports = mongoose.model("Product", productSchema);