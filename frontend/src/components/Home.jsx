import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AirbnbContext } from "../AirbnbContext";

const Home = () => {
  const { homes, filterHomes, user } = useContext(AirbnbContext);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const postFavouriteHomes = async (homeId) => {
    console.log("homeid", homeId);
    try {
      const response = await axios.post("http://localhost:7070/whishlist", {
        homeId,
      });
      console.log("favourite homes added", response.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.log("internal server error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 ">
      {showAlert && (
        <div className="fixed top-20 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out">
          ✅ Home added to wishlist!
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterHomes.map((home) => (
          <div
            key={home._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={home.imageUrl}
              alt={home.title}
              className="w-full h-40 sm:h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {home.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {home.description.length > 100
                  ? home.description.slice(0, 100) + "..."
                  : home.description}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-red-500">
                  ₹{home.price} / night
                </span>
                <span className="text-yellow-500 text-sm font-semibold">
                  ⭐ {home.rating}
                </span>
              </div>

              {/* Buttons Row */}
              <div className="mt-4 flex justify-center sm:justify-between items-center flex-wrap gap-2">
                <button className="px-3 py-1 bg-blue-400 text-white text-xs sm:text-sm rounded-md hover:bg-blue-600 transition-all cursor-pointer">
                  <Link to={`/home/${home._id}`}>View Details</Link>
                </button>
                <button
                  className="px-3 py-1 bg-red-400 text-white text-xs sm:text-sm rounded-md hover:bg-red-600 transition-all cursor-pointer"
                  onClick={() => {
                    if (user) {
                      postFavouriteHomes(home._id);
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  💖 Wishlist
                </button>

                <Link
                  to="/bookings"
                  className="px-3 py-1 bg-green-500 text-white text-xs sm:text-sm rounded-md hover:bg-green-600 transition-all"
                >
                  📅 Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
