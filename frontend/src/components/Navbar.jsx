import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AirbnbContext } from "../AirbnbContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser, filterHomes, setFilterHomes } =
    useContext(AirbnbContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const navigate = useNavigate();
  const [searchHomes, setSearchHomes] = useState("");

  // if (!user) {
  //   setIsOpen(false);
  // }

  const handleSearchQuery = (event) => {
    setSearchHomes(event.target.value);
  };

  const handleSearchHomes = () => {
    const filtered = filterHomes.filter((home) =>
      home.location.toLowerCase().includes(searchHomes.toLowerCase())
    );

    setFilterHomes(filtered);
    setSearchHomes("");
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:7070/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left - Logo & Menu (Mobile Toggle) */}
          <div className="flex items-center space-x-6">
          <Link
  to="/"
  className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text px-3 py-1 transition-all hover:scale-110 hover:drop-shadow-lg"
>
  Urban<span className="text-red-400">Nest</span> 
</Link>


            {/* Mobile Menu Button */}
            <button
              className="block md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✖" : "☰"}
            </button>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 text-gray-800 font-medium">
              <li>
                {user ? (
                  <Link
                    to="/wishlist"
                    className="hover:text-blue-400 transition-all"
                  >
                    Wishlist
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li>
                {user ? (
                  <Link
                    to="/bookings"
                    className="hover:text-green-500 transition-all"
                  >
                    Bookings
                  </Link>
                ) : (
                  ""
                )}
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center w-full ">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                onChange={handleSearchQuery}
                value={searchHomes}
                placeholder="Type a city to explore stays..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-red-400 focus:outline-none text-gray-700 shadow-sm pr-10"
              />
              <button
                className="absolute inset-y-0 right-2 flex items-center px-3  text-white rounded-4xl transition-all cursor-pointer"
                onClick={handleSearchHomes}
              >
                🔍
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/admin-dashboard"
                className="text-gray-700 hover:text-blue-800 transition text-xl"
              >
                Admin
              </Link>
            ) : (
              ""
            )}

            {/* {user ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Login
              </Link>
            )} */}
            {user ? (
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300"
                  onClick={() => setIsOpenProfile(!isOpenProfile)}
                >
                  <img
                    src="https://img.freepik.com/free-vector/smiling-redhaired-boy-illustration_1308-176664.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isOpenProfile && user && (
                  <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-3 w-48 text-sm">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-gray-500">{user?.email}</p>
                    <hr className="my-2" />
                    {user ? (
                      <button
                        className="w-full text-left text-blue-500 hover:text-red-700 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="w-full text-left text-blue-500 hover:text-blue-700 cursor-pointer"
                      >
                        Login
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="w-full text-left text-blue-500 hover:text-blue-700 text-xl cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu (Admin & Logout/ Login are outside) */}
        {isOpen && user && (
          <div className="md:hidden bg-white shadow-md py-4 px-6">
            <ul className="flex flex-col space-y-4 text-gray-800 font-medium">
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-red-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/bookings"
                  className="hover:text-green-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Bookings
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
