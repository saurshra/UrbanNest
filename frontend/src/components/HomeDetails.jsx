import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const HomeDetails = () => {
  const [homeDetails, setHomeDetails] = useState([]);
  const { homeId } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHomeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7070/all-homes/${homeId}`
        );
        console.log("details of homes", response.data.homeById);
        setHomeDetails(response.data.homeById);
      } catch (error) {
        console.log("error while fetching home details", error);
        setMessage(error);
      }
    };
    fetchHomeDetails();
  }, [homeId]);

  if (message) {
    return <p>Page not found</p>;
  }
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <img
          src={homeDetails.imageUrl}
          alt="Home"
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Home Info */}
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {homeDetails.title}
          </h1>
          <p className="text-gray-600 mt-2">{homeDetails.description}</p>

          {/* Price & Rating */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-semibold text-pink-600">
              ₹{homeDetails.price} per night
            </p>
            <p className="text-lg font-semibold text-yellow-500">⭐ 4.5</p>
          </div>

          {/* Location & Amenities */}
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-700">
              📍{homeDetails.location}
            </p>
            <p className="text-gray-600 mt-1">🏡 {homeDetails.amenities}</p>
          </div>

          {/* Views */}
          <p className="mt-2 text-gray-600">🌅{homeDetails.views}</p>

          {/* Host Info */}
          <p className="mt-4 font-semibold text-gray-800">
            👤 Hosted by:{homeDetails.hostname}
          </p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4036530.108017369!2d75.59432783259507!3d20.59368402080368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM1JzM3LjMiTiA3OMKwNTcnNDMuNyJF!5e0!3m2!1sen!2sin!4v1648774487938!5m2!1sen!2sin"
            width="100%"
            height="400"
            className="rounded-2xl mt-1.5"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Action Button */}
          <Link
            to="/bookings"
            className="mt-6 w-full bg-pink-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-pink-600 transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
      ;
    </div>
  );
};

export default HomeDetails;
