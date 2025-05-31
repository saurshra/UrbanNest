import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AirbnbContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  const [homes, setHomes] = useState([]);
  const [filterHomes, setFilterHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get("http://localhost:7070/all-homes");
        setHomes(response.data.getAllHomes);
        setFilterHomes(response.data.getAllHomes);
        //console.log("home fetched", response.data.getAllHomes);
      } catch (error) {
        console.log("error while fetching", error);
        setMessage("Home is not fetched");
      }
    };

    fetchHomes();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:7070/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(" profile response", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AirbnbContext.Provider
      value={{
        user,
        setUser,
        homes,
        setHomes,
        filterHomes,
        setFilterHomes,
      }}
    >
      {children}
    </AirbnbContext.Provider>
  );
};
