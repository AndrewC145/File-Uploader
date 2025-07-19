import Hero from "./Hero";
import Features from "./Features";
import { useContext } from "react";
import UserContext from "@/context/userContext";

function Home() {
  const { loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="font-georgia">
      <Hero />
      <Features />
    </main>
  );
}

export default Home;
