import React, { useState, useEffect, Suspense } from "react";
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import Countries from "./components/Countries/Countries";
const CountryDetails = React.lazy(() => import("./components/CountryDetails/CountryDetails"));

function App() {
  const [countries, setCountries] = useState([]);
  const [darkmode, setDarkmode] = useState(true);
  const [searchCountries, setSearchCountries] = useState([...countries])
  // const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [region, setRegion] = useState("");

  const search = (countryName) => {
    setPage(0)
    let filterdCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryName))
    setSearchCountries(filterdCountries)
    console.log(searchCountries)
  }
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(res => {
        let legalCountries = res.data.filter(country => country.name.common !== "Israel")
        setCountries(legalCountries)

      })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    setSearchCountries(countries)
  }, [countries])


  useEffect(() => {
    if (region === "") {
      setSearchCountries(countries);
    } else {
      let arr = countries.filter((country) => country.region === region);
      setSearchCountries(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  return (
    <div className="app" data-theme={darkmode ? "dark" : "light"}>
      <Navbar setDarkmode={setDarkmode} darkmode={darkmode} />
      <Router>
        <React.Fragment>
          <Routes>
            <Route path="/countryDetails/:countryName" exact
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <CountryDetails
                    setSearchCountries={setSearchCountries}
                    countries={countries}
                  />
                </Suspense>
              }>

            </Route>
            <Route
              path="/"
              element={
                <Countries
                  countries={searchCountries}
                  setSearchInput={search}
                  page={page}
                  setPage={setPage}
                  region={region}
                  setRegion={setRegion}
                  isDarkmode={darkmode}
                />
              } />

          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
