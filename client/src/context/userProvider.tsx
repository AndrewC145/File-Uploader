/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const PORT = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(PORT, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error: any) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [PORT, location.pathname]);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${PORT}/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log("Logout successful");
        setUser(null);
        navigate("/login", { replace: true });
      }
    } catch (error: any) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
