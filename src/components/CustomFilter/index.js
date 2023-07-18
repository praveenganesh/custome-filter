import React, { useState } from "react";
import { Button, Menu, MenuItem, FormControl, InputLabel } from "@mui/material";

function FilterStrip({ filterData, onFilterChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    onFilterChange(option);
    handleMenuClose();
  };

  return (
    <FormControl>
      <Button
        variant="contained"
        onClick={handleMenuOpen}
        aria-controls="filter-menu"
        aria-haspopup="true"
      >
        Custom Filter +
      </Button>

      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {filterData
          .filter((option) => option.choosen === false)
          .map((option, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => handleOptionSelect(option.label)}
              >
                {option.label}
              </MenuItem>
            );
          })}
      </Menu>

      <p>Selected Option: {selectedOption}</p>
    </FormControl>
  );
}

export default FilterStrip;
