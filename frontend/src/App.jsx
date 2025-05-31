import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AddHome from "./components/AddHome";
import AdminDash from "./components/AdminDash";
import { Route, Routes } from "react-router-dom";
import Wishlist from "./components/WhishList";
import HomeDetails from "./components/HomeDetails";
import EditHome from "./components/EditHome";
import BookingPage from "./components/BookingPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/:homeId" element={<HomeDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-home" element={<AddHome />} />
        <Route path="/edit-home/:id" element={<EditHome />} />
        <Route path="/admin-dashboard" element={<AdminDash />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
    </>
  );
};

export default App;
