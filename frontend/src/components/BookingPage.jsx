import React, { useState } from "react";

const BookingPage = () => {
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Submitted! (Add functionality here)");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">
          Book Your Stay
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">
              Guests
            </label>
            <input
              type="number"
              name="guests"
              value={bookingDetails.guests}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
