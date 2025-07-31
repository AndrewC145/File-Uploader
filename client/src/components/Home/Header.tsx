import { Link } from "react-router";
import { Button } from "../ui/button";
import { useContext } from "react";
import UserContext from "@/context/userContext";
type HeaderButtonProps = {
  text: string;
  link: string;
  className?: string;
};

function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="p-3 pb-0 md:p-5 md:pb-0 xl:p-7 xl:pb-0">
      <nav className="flex items-center justify-between border-b-1 pb-3">
        <Link to="/">
          <h1 className="font-nunito text-lg font-bold text-gray-800 lg:text-xl xl:text-3xl 2xl:text-4xl">
            Packet
          </h1>
        </Link>
        <div className="space-x-4">
          {user !== null ? (
            <>
              <HeaderButton
                className="bg-gray-200 px-2 py-1 text-sm text-black hover:bg-gray-300 sm:px-3 sm:py-2"
                text="Storage"
                link="/storage"
              />
              <LogoutButton />
            </>
          ) : (
            <>
              <HeaderButton
                className="bg-gray-200 px-2 py-1 text-sm text-black hover:bg-gray-300 sm:px-3 sm:py-2"
                text="Sign Up"
                link="/register"
              />
              <HeaderButton
                className="bg-blue-400 px-2 py-1 text-white hover:bg-blue-500 sm:px-3 sm:py-2"
                text="Login"
                link="/login"
              />
            </>
          )}
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

  function LogoutButton() {
    const { logoutUser } = useContext(UserContext);

    return (
      <Button
        className="cursor-pointer bg-blue-400 px-2 py-1 text-white hover:bg-blue-500 sm:px-3 sm:py-2"
        onClick={logoutUser}
      >
        Logout
      </Button>
    );
  }
}

export default Header;
