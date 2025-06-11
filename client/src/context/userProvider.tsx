/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router";
import axios from "axios";

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const PORT = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(PORT, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response);
        setUser(response.data);
      } catch (error: any) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [PORT]);

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser: async () => {} }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
