import React from "react";
import Pagination from "@mui/material/Pagination";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import SelectBox from "../SelectBox/SelectBox";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Countries({
  countries,
  setSearchInput,
  setPage,
  page,
  region,
  setRegion,
}) {
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <>
      <div className="countries">
        <div className="countries-filters">
          <SearchBar
            setSearchInput={setSearchInput}
            style={{ maxWidth: "350px" }}
          />
          <SelectBox region={region} handleRegionChange={handleRegionChange} />
        </div>
        <div className="container">
          {countries.length > 0 ? (
            countries
              .slice(8 * page, 8 * (page + 1))
              .map((country) => (
                <Card
                  key={country.name.common}
                  flag={country.flags.png}
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                />
              ))
          ) : (
            <Alert
              severity="info"
              style={{
                fontSize: " 1.1rem",
                gridColumnStart: "1",
                gridColumnEnd: "4",
              }}
            >
              <AlertTitle>Info</AlertTitle>
              The Earth consists of only 195 countries —{" "}
              <strong>Check out Mars you may find what you looking for!</strong>
            </Alert>
          )}
        </div>
      </div>
      <Pagination
        className="pagination"
        onChange={(e, page) => {
          setPage(page - 1);
        }}
        style={{
          padding: "2rem 0",
          display: "flex",
          justifyContent: "center",
        }}
        color="primary"
        count={Math.ceil(countries.length / 8)}
      />
    </>
  );
}

export default Countries;
