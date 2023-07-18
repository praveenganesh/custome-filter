import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import Button from "../Button";
import DateUtil from "../../../utils/DateUtils";

function FilterStrip({ filter, onFilterChange }) {
  let { id, options, label } = filter;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const customRangeRef = useRef(null);
  let displayValue = "";
  if (startDate && endDate) {
    displayValue = `${startDate} to ${endDate}`;
  }

  useEffect(() => {
    if (filter.selectedValue) {
      setStartDate(filter.selectedValue.startDate);
      setEndDate(filter.selectedValue.endDate);
    }
  }, [filter.selectedValue]);

  const handleOptionChange = (event) => {
    if (event.target.value !== "custom-range") {
      //i added getDateRange method as separate util, instead of adding in useFiltersHook,
      //because this component can be reused for some other purpose
      let range = DateUtil.getDateRange(event.target.value);
      setStartDate(range.startDate);
      setEndDate(range.endDate);
    } else {
      event.preventDefault();
    }
    setSelectedOption(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleCustomRangeClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    setStartDate(startDate);
    setEndDate(endDate);

    onFilterChange(id, { startDate, endDate: endDate }, selectedOption);
    handleMenuClose();
  };

  const handleClose = () => {
    handleMenuClose();
    setStartDate(filter.selectedValue.startDate);
    setEndDate(filter.selectedValue.endDate);
    setSelectedOption("");
  };

  const renderOptions = () => {
    let menulist = options.map((data, i) => {
      if (data === "custom-range") {
        return (
          <MenuItem key={i} value="custom-range">
            Custom Range{" :"}
            <div
              ref={customRangeRef}
              onMouseDown={handleCustomRangeClick}
              onClick={(event) => event.stopPropagation()}
            >
              <TextField
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <TextField
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </MenuItem>
        );
      }
      return (
        <MenuItem key={i} value={data}>
          {data}
        </MenuItem>
      );
    });

    menulist = [
      ...menulist,
      <MenuItem id="any" value={displayValue} style={{ display: "none" }}>
        {displayValue}
      </MenuItem>,
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
      </MenuItem>,
    ];
    return menulist;
  };
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        onClick={handleMenuOpen}
        open={Boolean(anchorEl)}
        value={displayValue || ""}
        variant="standard"
        style={{ width: "200px" }}
        onChange={handleOptionChange}
        renderValue={(selected) => {
          if (!anchorEl) {
            if (
              filter.selectedValue.startDate &&
              filter.selectedValue.endDate
            ) {
              return `${filter.selectedValue.startDate} to ${filter.selectedValue.endDate}`;
            }
            return "";
          }
          return selectedOption;
        }}
      >
        {renderOptions()}
      </Select>
    </FormControl>
  );
}

export default FilterStrip;
