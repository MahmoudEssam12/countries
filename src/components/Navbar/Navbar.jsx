import React from "react";
import navbarStyle from "./Navbar.module.scss";
function Navbar({ setDarkmode, darkmode }) {
  return (
    <nav className={navbarStyle.navbar}>
      <div className={`${navbarStyle.container}`}>
        <h2>Where in the world?</h2>
        <div
          className={navbarStyle.darkmode}
          onClick={() => setDarkmode(!darkmode)}
        >
          <i className="fa-solid fa-moon"></i>
          <span>dark mode</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
