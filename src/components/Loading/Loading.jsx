import React from "react";
import { useSelector } from "react-redux";
import loadingStyle from "./Loading.module.scss";
function Loading() {
  const mode = useSelector((state) => state.mode);

  return (
    <div
      className={`${loadingStyle.loading}`}
      style={{
        backgroundColor: mode === "dark" ? "hsl(209, 23%, 22%)" : "#fff",
      }}
    >
      <div
        className={`${loadingStyle.loading__icon}`}
        style={{
          color: mode === "dark" ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
        }}
      >
        <i className="fa-solid fa-earth-africa"></i>
      </div>
      <div
        className={`${loadingStyle.loading__text}`}
        style={{
          color: mode === "dark" ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
        }}
      >
        Loading...
      </div>
    </div>
  );
}

export default Loading;
