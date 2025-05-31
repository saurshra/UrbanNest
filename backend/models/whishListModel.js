const mongoose = require("mongoose");

const whishListSchema = new mongoose.Schema({
  homes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homes",
    },
  ],
});

const whishList = mongoose.model("whishlist", whishListSchema);

module.exports = whishList;
