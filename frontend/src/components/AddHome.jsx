import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHome = () => {
  const [addHomes, setAddHomes] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    rating: "",
    location: "",
    amenities: "",
    hostname: "",
    views: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeHomes = (event) => {
    setAddHomes({ ...addHomes, [event.target.name]: event.target.value });
  };

  const handleSubmitHomes = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7070/all-homes",
        addHomes
      );
      setMessage(response.data.message);
      console.log("response homes", response.data.message);
      navigate("/");
      setAddHomes({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        rating: "",
        location: "",
        amenities: "",
        hostname: "",
        views: "",
      });
    } catch (error) {
      console.log("Home is not posted ", error);
      setMessage(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">
          🏡 Add a Home
        </h1>
        <form className="space-y-3" onSubmit={handleSubmitHomes}>
          <input
            type="text"
            name="title"
            onChange={handleChangeHomes}
            value={addHomes.title}
            placeholder="Title"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <textarea
            name="description"
            onChange={handleChangeHomes}
            value={addHomes.description}
            placeholder="Description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows="3"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            onChange={handleChangeHomes}
            value={addHomes.price}
            placeholder="Price ($ per night)"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="imageUrl"
            onChange={handleChangeHomes}
            value={addHomes.imageUrl}
            placeholder="Image URL"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="views"
            onChange={handleChangeHomes}
            value={addHomes.views}
            placeholder="Describe the view from the home "
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="rating"
            onChange={handleChangeHomes}
            value={addHomes.rating}
            placeholder="Rating"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="location"
            onChange={handleChangeHomes}
            value={addHomes.location}
            placeholder="Location"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="amenities"
            onChange={handleChangeHomes}
            value={addHomes.amenities}
            placeholder="Amenities"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="hostname"
            onChange={handleChangeHomes}
            value={addHomes.hostname}
            placeholder="Host name "
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all cursor-pointer"
          >
            Add Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHome;
