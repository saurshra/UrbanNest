const addHome = require("../models/homeModel");

exports.getHomes = async (req, res) => {
  try {
    const getAllHomes = await addHome.find();
    if (getAllHomes.length === 0) {
      console.log("there is no homes", getAllHomes);
      return res.status(404).json({ message: "there is no home found" });
    }

    return res
      .status(200)
      .json({ message: "Home fetches successfully", getAllHomes });
  } catch (error) {
    console.log("there is something wrong ");
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getHomesById = async (req, res) => {
  const { id } = req.params;
  try {
    const homeById = await addHome.findById(id);
    if (!homeById) {
      return res.status(404).json({ message: "Home is not found" });
    }

    return res.status(200).json({ message: "home is found", homeById });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.postHomes = async (req, res) => {
  const {
    title,
    description,
    price,
    rating,
    imageUrl,
    location,
    views,
    amenities,
    hostname,
  } = req.body;

  try {
    const homes = await addHome.create({
      title,
      description,
      price,
      rating,
      imageUrl,
      location,
      views,
      amenities,
      hostname,
    });
    return res.status(201).json({ message: "Home added successfully", homes });
  } catch (error) {
    console.log("There is something wrong", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteHome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteHouse = await addHome.findByIdAndDelete(id);
    if (!deleteHouse) {
      console.log("there is no home for delete ", deleteHouse);
      return res.status(204).json({ message: "There is no  hoems for delete" });
    }

    return res
      .status(200)
      .json({ message: "Home deleted successfully", deleteHouse });
  } catch (error) {
    console.log("Internal server error");
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.editHomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const editHome = await addHome.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!editHome) {
      return res.status(404).json({ message: "home is not found to edit" });
    }

    return res.status(200).json({ message: "Home is updated", editHome });
  } catch (error) {
    console.log("internal server error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
