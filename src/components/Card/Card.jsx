import React from "react";
import { Link } from "react-router-dom";

import "./Card.scss";
function Card({ flag, name, population, region, capital }) {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="country">
      <Link to={`/countryDetails/${name}`}>
        <div className="country__img">
          <img src={flag} alt={flag} />
        </div>
      </Link>
      <div className="country__details">
        <Link to="/countryDetails">
          <h3>{name}</h3>
        </Link>

        <ul>
          <li>
            <strong>population</strong>:{" "}
            <span>{numberWithCommas(population)}</span>
          </li>
          <li>
            <strong>region</strong>: <span>{region}</span>
          </li>
          <li>
            <strong>capital</strong>:{" "}
            <span>{name === "Palestine" ? "القدس" : capital}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
