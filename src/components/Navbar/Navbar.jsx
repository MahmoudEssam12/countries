import React from "react";
import navbarStyle from "./Navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDarkmode } from "./../../store/actions/darkmode";
function Navbar() {
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  return (
    <nav className={navbarStyle.navbar}>
      <div className={`${navbarStyle.container}`}>
        <h2>Where in the world?</h2>
        <div
          className={navbarStyle.darkmode}
          onClick={() =>
            dispatch(setDarkmode(mode === "dark" ? "light" : "dark"))
          }
        >
          <i className="fa-solid fa-moon"></i>
          <span>dark mode</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
