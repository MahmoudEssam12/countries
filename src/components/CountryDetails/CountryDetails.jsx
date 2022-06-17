import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CountryDetails.scss";

function CountryDetails({ countries, setSearchCountries }) {
  let params = useParams();

  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [country, setCountry] = useState({});
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    setSearchCountries(countries);
  };

  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/name/${params.countryName}?fullText=true`
      )
      .then((res) => {
        setCountry(res.data[0]);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              {country?.borders
                ?.filter((border) => border !== "ISR")
                .map((border, index) => {
                  return (
                    <div className="border-country" key={index}>
                      {border || "none"}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
