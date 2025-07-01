import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../store/darkmodeSlice";
import { MdDarkMode, MdOutlineNightlight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("Authtoken"));
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const handleLogoutUser = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("Authtoken");
    localStorage.removeItem("name");
    localStorage.removeItem("newUser");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 dark:bg-[var(--primary_dark)] bg-white shadow-md dark:shadow-gray-900 text-gray-600 dark:text-gray-300">
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center gap-5">
          <div className="px-2 py-1 border border-black dark:border-[var(--border_light)] rounded-xl">
            <h1 className="font-bold">ET</h1>
          </div>

          <ul className="hidden md:flex gap-10">
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/income">Income</Link></li>
            <li><Link to="/expenses">Expenses</Link></li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {loggedIn && (
            <button onClick={handleLogoutUser} className="hidden md:block">
              Logout
            </button>
          )}
          <div className="border px-2 py-1 rounded-xl">
            {mode === "light" ? (
              <button onClick={() => dispatch(darkMode())}>
                <MdDarkMode />
              </button>
            ) : (
              <button onClick={() => dispatch(lightMode())}>
                <MdOutlineNightlight />
              </button>
            )}
          </div>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-5 pb-4 bg-white dark:bg-[var(--primary_dark)] shadow-md">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/income" onClick={() => setMenuOpen(false)}>Income</Link>
          <Link to="/expenses" onClick={() => setMenuOpen(false)}>Expenses</Link>
          {loggedIn && (
            <button onClick={() => { handleLogoutUser(); setMenuOpen(false); }}>
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
