import { Link } from "react-router";
import { Button } from "./ui/button";

type HeaderButtonProps = {
  text: string;
  link: string;
  className?: string;
};

function Header() {
  return (
    <header className="p-3 md:p-5 xl:p-7">
      <nav className="flex items-center justify-between border-b-1 pb-3">
        <h1 className="text-md font-nunito font-bold text-white md:text-lg xl:text-3xl 2xl:text-4xl">
          Packet
        </h1>
        <div className="space-x-4">
          <HeaderButton
            className="bg-white text-black hover:bg-gray-100"
            text="Sign Up"
            link="/register"
          />
          <HeaderButton
            className="bg-blue-400 text-white hover:bg-blue-500"
            text="Login"
            link="/login"
          />
        </div>
      </nav>
    </header>
  );

  function HeaderButton({ text, link, className }: HeaderButtonProps) {
    return (
      <Button className={className} asChild>
        <Link to={link}>{text}</Link>
      </Button>
    );
  }
}

export default Header;
