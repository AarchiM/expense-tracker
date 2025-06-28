import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../store/darkmodeSlice";
import { MdDarkMode, MdOutlineNightlight } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();
  useEffect(() => {
    if (mode === "dark") {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="sticky top-0 dark:bg-primary_dark dark:text-white shadow-md dark:shadow-gray-900 flex justify-between p-5">
        <div className="flex flex-row gap-10">
        <div className="px-1 border-black dark:border-border_light border rounded-xl">
            <h1>ET</h1>
        </div>
            <ul className="flex gap-10">
                <li><Link to='/dashboard'>Home</Link></li>
                <li><Link to='/income'>Income</Link></li>
                <li><Link to='/expenses'>Expenses</Link></li>
            </ul>
        </div>
        <div className="border px-1 flex justify-center rounded-xl">
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
    </div>
  );
};

export default Navbar;
