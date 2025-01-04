import React, { useState, useRef } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { stringToColor, getInitials } from "../../helpers/Helper";
import Search from "../Helpers/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../utils/Redux/userSlice";

 function Navbar({ page, user }) {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <>
      <nav className="bg-white">
        <div
          className={`max-w-auto mx-auto px-4 sm:px-6 lg:px-8 ${
            page === "write" ? "md:max-w-[70%]" : "max-w-full"
          }`}
        >
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="h-24 w-auto max-w-[200px] md:h-24 md:max-w-[250px] lg:h-24 lg:max-w-[250px] xl:h-24 xl:max-w-[220px]"
                />
              </Link>
            </div>

            {page === "home" && (
              <div className="hidden md:flex flex-grow items-center mr-5">
                <Search />
              </div>
            )}

            {user ? (
              <div className="hidden md:flex items-center space-x-10 cursor-pointer">
                {page !== "write" && (
                  <div
                    className="flex items-center space-x-2 group hover:text-gray-900"
                    onClick={() => navigate("/write")}
                  >
                    <FaEdit
                      size={22}
                      className="text-gray-500 group-hover:text-icons"
                    />
                    <span className="text-gray-500 group-hover:text-icons">
                      Write
                    </span>
                  </div>
                )}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: stringToColor(user?.name || "Unknown"),
                  }}
                  onClick={() => navigate("/profile")}
                >
                  <span className="text-white font-bold">
                    {getInitials(user?.name)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/auth/signin">
                  <button className="p-2 text-gray-800 border border-gray-300 rounded">
                    Login
                  </button>
                </Link>
                <Link to="/auth/signup">
                  <button className="p-2 text-gray-800 border border-gray-300 rounded">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                {isOpen ? <MdClose size={32} /> : <GiHamburgerMenu size={32} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 cursor-pointer">
              {user ? (
                <>
                  <Link
                    to="/write"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    write
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    profile
                  </Link>
                  <span onClick={handleLogout}
                    to="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/signin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
export default React.memo(Navbar)