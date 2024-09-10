import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

import { FaPlusCircle } from "react-icons/fa";
import { PiUserSwitch } from "react-icons/pi";
import { PiUserSwitchFill } from "react-icons/pi";
import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { useState } from "react";

const Navbar = ({ themeHandler }) => {

  const [Y, setY] = useState(true)

  const toggleTheme = () => {
    themeHandler()
    setY(!Y)
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-around pt-4">
        <Link to={"/"}>
          <h1 className="text-2xl text-black font-semibold dark:text-white">
            Post Maker 📝
          </h1>
        </Link>

        <div className="flex items-center gap-4 md:gap-10">
          <Link to={"/create"}>
            <h1 className="text-2xl text-green-600 font-bold">
              <FaPlusCircle />
            </h1>
          </Link>
          {
            <button className="text-3xl text-black dark:text-white" onClick={toggleTheme}>
              {Y ? <PiUserSwitch /> : <PiUserSwitchFill />}
            </button>
          }
          <button className="text-3xl text-red-600" onClick={logoutHandler}>
            <IoMdLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
