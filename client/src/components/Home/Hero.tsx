import { Button } from "../ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="2xl:text-10xl mb-5 max-w-[800px] text-center font-georgia text-xl font-semibold text-white sm:text-2xl md:mb-6 md:text-3xl lg:text-5xl xl:mb-8 xl:text-6xl">
          The new era of storing your files online, here now
        </h1>
        <p className="mb-5 max-w-[800px] text-center text-sm text-gray-100 sm:text-base">
          Store your files securely and access them from anywhere, anytime.
        </p>
        <Button
          asChild
          className="cursor-pointer bg-blue-400 p-4 text-white hover:bg-blue-500 sm:p-5 lg:p-4"
        >
          <Link to="/register">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
