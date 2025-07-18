/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const PORT = import.meta.env.VITE_API_URL;

export function useFolders(userId: string) {
  const [folders, setFolders] = useState<any[]>([]);
  const getFolders = useCallback(async () => {
    if (!userId) return;
    const response = await axios.get(`${PORT}/${userId}/folders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setFolders(response.data);
  }, [userId]);

  useEffect(() => {
    getFolders();
  }, [getFolders]);

  return { folders, getFolders };
}
