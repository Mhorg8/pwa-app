import { LuLogIn, LuMenu } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { navLInks } from "../../constants";

const Header = () => {
  const location = useLocation();

  return (
    <div className="container bg-soft-gray flex items-center justify-between rounded-full py-2 my-2 ">
      <Link
        to="/"
        className="text-xl font-bold hover:text-dark-green hoverEffect"
      >
        Taskify
      </Link>

      <div className="hidden md:block">
        <ul className="flex items-center gap-4">
          {navLInks.map((link) => {
            return (
              <Link to={link.path} key={link.id}>
                <span
                  className={`${
                    location.pathname === link.path
                      ? "underline underline-offset-2"
                      : ""
                  } font-medium hover:text-dark-green hoverEffect`}
                >
                  {link.text}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-5">
        <button className="cursor-pointer">
          <LuLogIn size={24} />
        </button>
        <button className="block md:hidden cursor-pointer">
          <LuMenu size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
