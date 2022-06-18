import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import "./CountryDetails.scss";

function CountryDetails({ countries, setSearchCountries }) {
  let params = useParams();
  let location = useLocation();
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [country, setCountry] = useState({});
  const [neighbors, setNeighbors] = useState([{}]);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    setSearchCountries(countries);
  };

  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    console.log(
      `https://restcountries.com/v3.1/name/${params.countryName}?fullText=true`
    );
    axios
      .get(
        `https://restcountries.com/v3.1/name/${params.countryName}?fullText=true`
      )
      .then((res) => {
        setCountry(res.data[0]);
        console.log(res);
        if (res.data[0].borders) {
          axios
            .get(
              `https://restcountries.com/v3.1/alpha?codes=${res.data[0].borders.join(
                ","
              )}`
            )
            .then((data) => {
              const palestine = {
                name: {
                  common: "Palestine",
                },
              };
              const deleted = data.data.findIndex(
                (country) => country.name.common === "Israel"
              );
              if (deleted !== -1) {
                data.data.splice(deleted, deleted, palestine);
              }
              setNeighbors(data.data);
            });
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  useEffect(() => {
    if (country) {
      for (let key in country?.currencies) {
        setCurrencies([
          {
            name: country.currencies[key].name,
            symbol: country.currencies[key].symbol,
          },
        ]);
      }
      for (let key in country?.languages) {
        setLanguages([
          {
            name: country.languages[key],
          },
        ]);
      }
    }
  }, [country]);

  return (
    <div className="country-wrapper">
      {loading && <Loading />}

      <div className="container">
        <button className="back-btn" onClick={goBack}>
          <i className="fa-solid fa-arrow-left-long"></i>Back
        </button>

        <div className="country-details">
          <div className="flag">
            <img src={country?.flags?.png} alt={country?.name?.common} />
          </div>
          <div className="info">
            <h1>{country?.name?.common}</h1>
            <ul>
              <li>
                <strong>Native Name:</strong>{" "}
                <span>{country?.name?.official || "none"}</span>
              </li>
              <li>
                <strong>population:</strong>{" "}
                <span>{numberWithCommas(country?.population)}</span>
              </li>
              <li>
                <strong>region:</strong> <span>{country?.region}</span>
              </li>
              <li>
                <strong>sub region:</strong>{" "}
                <span>{country?.subregion || "none"}</span>
              </li>
              <li>
                <strong>capital:</strong>{" "}
                <span>{country?.capital || "none"}</span>
              </li>
              <li>
                <strong>currencies:</strong>{" "}
                {currencies.map((curr, index) => (
                  <span key={index}>
                    {curr.name || "none"}({curr.symbol})
                  </span>
                ))}
              </li>
              <li>
                <strong>languages:</strong>{" "}
                {languages?.map((lang, index) => (
                  <span key={index}>{lang.name || "none"}</span>
                ))}
              </li>
            </ul>
            <div className="borders">
              <strong>border countries: </strong>
              {country.borders &&
                country?.borders
                  ?.filter((border) => border !== "ISR")
                  .map((border, index) => {
                    return (
                      <Link
                        to={`/countryDetails/${neighbors[index]?.name?.common}`}
                        key={index}
                      >
                        <div className="border-country">
                          {neighbors[index]?.name?.common || border || "none"}
                        </div>
                      </Link>
                    );
                  })}
              {!country?.borders && (
                <div style={{ fontWeight: "800" }}>None It's an Island</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
