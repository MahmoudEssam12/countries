import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function SelectBox({ region, handleRegionChange, isDarkmode }) {
  return (
    <Box
      sx={{
        minWidth: 190,
        borderRadius: "5px",
        borderColor: isDarkmode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
        borderWidth: "1rem",
        "&::hover": {
          borderColor: "#fff",
        },
      }}
      className="select-box"
    >
      <FormControl fullWidth>
        <InputLabel id="select-region-label" style={{ fontSize: "14px" }}>
          Filter by Region
        </InputLabel>
        <Select
          labelId="select-region-label"
          id="select-region"
          value={region}
          label="Filter by Region"
          onChange={handleRegionChange}
          sx={{
            borderRadius: "5px",
            fontSize: "14px",
            borderColor: isDarkmode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
            borderWidth: "1rem",
            "&:hover": {
              borderColor: "#fff",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={"Africa"}>Africa</MenuItem>
          <MenuItem value={"Asia"}>Asia</MenuItem>
          <MenuItem value={"Europe"}>Europe</MenuItem>
          <MenuItem value={"Americas"}>America</MenuItem>
          <MenuItem value={"Oceania"}>Oceania</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectBox;
