import React, { useState, useEffect, Suspense } from "react";
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import './App.scss';
const Countries = React.lazy(() => import("./components/Countries/Countries"));
const CountryDetails = React.lazy(() => import("./components/CountryDetails/CountryDetails"));

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState([...countries])
  // const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [region, setRegion] = useState("");
  const mode = useSelector(state => state.mode)
  //preloader
  const [loading, setLoading] = useState(true);

  const search = (countryName) => {
    setPage(0)
    let filterdCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()))
    setSearchCountries(filterdCountries)
  }
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(res => {
        let legalCountries = res.data.filter(country => country.name.common !== "Israel")
        setCountries(legalCountries)
        setLoading(false)
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
    <div className="app" data-theme={mode}>
      <Navbar />
      {loading && <Loading />}
      <Router>
        <React.Fragment>
          <Routes>
            <Route path="/countryDetails/:countryName" exact
              element={
                <Suspense fallback={<Loading />}>
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
                <Suspense fallback={<Loading />}>
                  <Countries
                    countries={searchCountries}
                    setSearchInput={search}
                    page={page}
                    setPage={setPage}
                    region={region}
                    setRegion={setRegion}
                  />
                </Suspense>
              } />

          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
