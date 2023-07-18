import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import Button from "../Button";

const StdSelect = styled(Select)`
  width: 200px;
  margin: 0 10px;
`;

const MultiSelectDropdown = ({ onFilterChange, filter }) => {
  let { id, options, label, selectedValue } = filter;
  const [selectedOptions, setSelectedOptions] = useState(selectedValue);

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (JSON.stringify(selectedValue) !== JSON.stringify(selectedOptions)) {
      setSelectedOptions([...selectedValue]);
    }
  }, [selectedValue]);

  const handleOptionChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    onFilterChange(id, selectedOptions);
    handleMenuClose();
  };

  const handleClose = () => {
    setSelectedOptions(selectedValue);
    handleMenuClose();
  };

  return (
    <FormControl>
      <InputLabel style={{ marginLeft: "10px" }}>{label}</InputLabel>
      <StdSelect
        anchorEl={anchorEl}
        multiple
        onClick={handleMenuOpen}
        onExited={handleClose}
        value={selectedOptions}
        open={Boolean(anchorEl)}
        style={{ width: 200 }}
        onChange={handleOptionChange}
        renderValue={(selected) => selected.join(", ")}
      >
        {options.map((option, i) => (
          <MenuItem
            key={i}
            value={option}
            selected={selectedOptions.includes(option)}
          >
            <Checkbox checked={selectedOptions.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
        <MenuItem
          key={"save-close"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button onClick={handleSave} variant="contained">
            save
          </Button>
          <Button onClick={handleClose} variant="contained">
            close
          </Button>
        </MenuItem>
      </StdSelect>
    </FormControl>
  );
};

export default MultiSelectDropdown;
