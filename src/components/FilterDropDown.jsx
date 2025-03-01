import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const FilterDropDown = ({ statusFilter, handleStatusChange }) => {
  return (
    <div className="mt-[10px]">
      <FormControl variant="outlined">
        <InputLabel id="filter">filter</InputLabel>
        <Select
          labelId="filter"
          value={statusFilter}
          onChange={handleStatusChange}
          label="filter"
          sx={{ width: 110, height: 40 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="close">Close</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterDropDown;
