const WhishList = require("../models/whishListModel");

exports.postWhishList = async (req, res) => {
  const { homeId } = req.body;
  try {
    let customerWhishList = await WhishList.findOne();
    if (!customerWhishList) {
      customerWhishList = await WhishList.create({ homes: [homeId] });
    } else {
      if (!customerWhishList.homes.includes(homeId)) {
        customerWhishList.homes.push(homeId);
        await customerWhishList.save();
      }
    }

    const populateHomes = await WhishList.findOne().populate("homes");
    return res
      .status(201)
      .json({ message: "whish list added", customerWhishList, populateHomes });
  } catch (error) {
    console.log("internal server error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

exports.getWhishList = async (req, res) => {
  try {
    const getFavouriteHomes = await WhishList.find().populate("homes");
    if (!getFavouriteHomes) {
      return res
        .status(404)
        .json({ message: "NO whishlist found", getFavouriteHomes });
    }

    return res.status(200).json({
      message: "Favourite homes fetched sucessfully",
      getFavouriteHomes,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

// exports.deleteWhishList = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleteFavourite = await WhishList.findByIdAndDelete(id);
//     if (!deleteFavourite) {
//       return res.status(204).json({ message: "No Favourite homes to remove" });
//     }

//     return res
//       .status(200)
//       .json({
//         message: "Favourite home is removed from whishlist",
//         deleteFavourite,
//       });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.deleteWhishList = async (req, res) => {
  const { id } = req.params; // id here should be the homeId

  try {
    const updatedWhishList = await WhishList.findOneAndUpdate(
      {},
      { $pull: { homes: id } },
      { new: true }
    ).populate("homes");

    if (!updatedWhishList) {
      return res.status(404).json({ message: "No wishlist found" });
    }

    return res.status(200).json({
      message: "Favourite home removed from wishlist",
      updatedWhishList,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
