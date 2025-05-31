import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AirbnbContext } from "../AirbnbContext";

const AdminDash = () => {
  const { homes, setHomes } = useContext(AirbnbContext);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteHomeId, setDeleteHomeId] = useState(null);

  const confirmDelete = async () => {
    if (!deleteHomeId) return;
    try {
      const response = await axios.delete(
        `http://localhost:7070/all-homes/${deleteHomeId}`
      );
      setHomes((prevHomes) =>
        prevHomes.filter((home) => home._id !== deleteHomeId)
      );
      console.log("delete response", response.data);
    } catch (error) {
      console.log("home is not deleted ", error);
    }
    setShowAlert(false);
    setDeleteHomeId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Homes</h3>
            <p className="text-2xl font-bold text-blue-500">{homes.length}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Bookings</h3>
            <p className="text-2xl font-bold text-green-500">8</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Users</h3>
            <p className="text-2xl font-bold text-blue-500">120</p>
          </div>
        </div>

        {/* Home Management Table */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <div className="flex flex-row justify-between">
            <h3 className="text-xl font-semibold mb-4">Manage Homes</h3>
            <button className="bg-blue-500 rounded-xl mb-3 p-1">
              <Link to="/add-home">Add home</Link>
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border">Sr no.</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {homes.map((home, index) => (
                <tr key={home._id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{home.title}</td>
                  <td className="p-2 border">₹ {home.price} / night</td>
                  <td className="p-2 border">
                    <Link to={`/edit-home/${home._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded-md mr-2 cursor-pointer">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="bg-red-500 text-white px-3 py-1 text-sm rounded-md cursor-pointer"
                      onClick={() => {
                        setShowAlert(true);
                        setDeleteHomeId(home._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAlert && (
          <div className="fixed bottom-10 right-10 z-50 bg-red-400 text-white px-4 py-2 rounded-lg shadow-lg">
            <p>Are you sure you want to delete?</p>
            <div className="flex flex-row justify-between mt-2">
              <button
                onClick={confirmDelete}
                className="bg-green-500 px-3 py-1 rounded-md cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setShowAlert(false)}
                className="bg-gray-500 px-3 py-1 rounded-md cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDash;
