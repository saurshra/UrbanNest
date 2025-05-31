import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [favourtiteHomes, setFavouriteHomes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFavouriteHomes = async () => {
      try {
        const response = await axios.get("http://localhost:7070/whishlist");
        setFavouriteHomes(response.data.getFavouriteHomes[0].homes);
        console.log(
          "favourite homes",
          response.data.getFavouriteHomes[0].homes
        );
      } catch (error) {
        console.log("favourite homes is not fatched", error);
        setMessage(response.data.message);
      }
    };

    fetchFavouriteHomes();
  }, []);

  const handleRemoveWhishList = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7070/whishlist/${id}`
      );
      console.log("favourite home is deleted", response.data);
      setFavouriteHomes((prev) => prev.filter((home) => home._id !== id));
    } catch (error) {
      console.log("there is something wrong", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        💖 Your Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favourtiteHomes.map((homes, id) => (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
              src={homes.imageUrl}
              alt="Wishlist Home"
              className="w-full h-40 sm:h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {homes.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {homes.description.length > 100
                  ? homes.description.slice(0, 100) + "..."
                  : homes.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-red-500">
                  ₹ {homes.price} / night
                </span>
                <span className="text-yellow-500 text-sm font-semibold">
                  ⭐ {homes.rating}
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-4 flex justify-center sm:justify-between items-center flex-wrap gap-2">
                <button className="px-3 py-1 bg-blue-400 text-white text-xs sm:text-sm rounded-md hover:bg-blue-600 transition-all">
                  <Link to={`/home/${homes._id}`}>View Details</Link>
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white text-xs sm:text-sm rounded-md hover:bg-red-700 transition-all cursor-pointer"
                  onClick={() => handleRemoveWhishList(homes._id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
