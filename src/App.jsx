import React, { useState } from "react";
import FlightsTable from "./components/FlightsTable";
import SearchBar from "./components/SearchBar";
import { Paper } from "@mui/material";
import { ToastContainer } from "react-toastify";
import FilterDropDown from "./components/FilterDropDown";

function App() {
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editFlight, setEditFlight] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setSearch(null)
  };

  return (
    <Paper
    sx={{ width: "80%", margin: "auto", overflow: "auto" }}
    elevation={4}
    > 
    <FilterDropDown statusFilter={statusFilter} handleStatusChange={handleStatusChange}/>
      <SearchBar handleSelectFlight={handleSelectFlight}  search={search} setSearch={setSearch} setSelectedFlight={setSelectedFlight}/>
      <FlightsTable
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        selectedFlight={selectedFlight} 
        search={search}
        statusFilter={statusFilter}
        />
        <ToastContainer/>
    </Paper>
  );
}

export default App;
