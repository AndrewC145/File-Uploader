/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const fetchHomeFiles = async (
  PORT: string,
  userId: number,
  setHomeFiles: (files: any[]) => void,
  setHomeId: (id: number) => void,
): Promise<void> => {
  try {
    const response = await axios.get(`${PORT}/storage`, {
      params: {
        userId: userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    setHomeFiles(response.data.homeFiles);
    setHomeId(response.data.homeId);
  } catch (error: any) {
    console.error("Error fetching home files:", error);
    throw new Error("Failed to fetch home files");
  }
};
