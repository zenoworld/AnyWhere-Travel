import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloudIcon from '@mui/icons-material/Cloud';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';



const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch({ latitude, longitude }); // Pass the latitude and longitude to onSearch
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <nav
      style={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <CloudIcon style={{ color: "white", fontSize: '4rem' }} /> {/* White CloudIcon */}
        <p style={{ fontWeight: "bold", fontSize: "35px", color: "white" }}>Weather</p>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <TextField
          variant="outlined"
          placeholder="Search city"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            backgroundColor: "transparent",
            borderRadius: "2rem",
            width: "22rem",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          style={{ borderRadius: "6px", backgroundColor: "#1F2A40 ", color: "#70d8bd" }}
        >
          Search
        </Button>
      </div>


      <div
        style={{
          // marginTop: "1rem",
          fontSize: "16px",
          fontWeight: "700",
          backgroundColor: "#1F2A40",
          height: "35px",
          width: "170px",
          color: "#70d8bd",
          gap: "2px",
          borderRadius: "6px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GpsFixedIcon />
        <Button
          style={{
            fontSize: "10px",
            color: "#70d8bd",
            padding: "0px 10px"
          }}
          onClick={handleCurrentLocation}
        >
          Current Location
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
