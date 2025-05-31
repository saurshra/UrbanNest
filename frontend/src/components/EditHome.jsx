import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditHome = () => {
  const [alert, setAlert] = useState(false);
  const { id } = useParams();
  const [editHome, setEditHome] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    imageUrl: "",
    location: "",
    views: "",
    amenities: "",
    hostname: "",
  });

  const handleEditChange = (event) => {
    setEditHome({ ...editHome, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const fetchHomesById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/all-homes/${id}`
        );
        setEditHome(response.data.homeById);
        console.log("home fetched", response.data.homeById);
      } catch (error) {
        console.log("error while fetching", error);
        //setMessage("Home is not fetched");
      }
    };

    fetchHomesById();
  }, []);
  2;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:7070/all-homes/${id}`,
        editHome,
        { withCredentials: true }
      );
      console.log("edit response", response);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      setEditHome({
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
      console.log("error found on edit home", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">
          🏡 Edit Home
        </h1>
        {alert && (
          <div className="fixed top-25 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
            ✅ Home edited sucessfully!
          </div>
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={handleEditChange}
            value={editHome.title}
            placeholder="Title"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <textarea
            name="description"
            onChange={handleEditChange}
            value={editHome.description}
            placeholder="Description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows="3"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            onChange={handleEditChange}
            value={editHome.price}
            placeholder="Price ($ per night)"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="imageUrl"
            onChange={handleEditChange}
            value={editHome.imageUrl}
            placeholder="Image URL"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="views"
            onChange={handleEditChange}
            value={editHome.views}
            placeholder="Describe the view from the home "
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="rating"
            onChange={handleEditChange}
            value={editHome.rating}
            placeholder="Rating"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="location"
            onChange={handleEditChange}
            value={editHome.location}
            placeholder="Location"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="amenities"
            onChange={handleEditChange}
            value={editHome.amenities}
            placeholder="Amenities"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            type="text"
            name="hostname"
            onChange={handleEditChange}
            value={editHome.hostname}
            placeholder="Host name "
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition-all cursor-pointer"
          >
            Edit Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditHome;
