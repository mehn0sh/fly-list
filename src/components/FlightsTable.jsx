import React, { useEffect, useState } from "react";
import {
  useGetFlightsQuery,
  useDeleteFlightMutation,
  useUpdateFlightMutation,
} from "../services/flightAPI";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./EditModal";

const FlightsTable = ({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  selectedFlight,
  search,
  statusFilter,
}) => {
  const [deleteFlight] = useDeleteFlightMutation();
  const [updateFlight] = useUpdateFlightMutation();
  const [open, setOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);

  const handleOpen = (flight) => {
    setCurrentFlight(flight);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentFlight(null);
  };

  const handleChange = (e) => {
    setCurrentFlight({ ...currentFlight, [e.target.name]: e.target.value });
  };
  let columnsField = ["id", "from", "to", "date", "time", "status", "actions"];

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const handleSave = async () => {
    await updateFlight({ id: currentFlight.id, updatedFlight: currentFlight });
    refetch();
    handleClose();
  };

  const {
    data: allFlights = [],
    isLoading,
    isError,
    refetch,
  } = useGetFlightsQuery({ sortField, sortOrder });


  const filteredFlights = selectedFlight
  ? [selectedFlight]
  : statusFilter
  ? allFlights.filter((flight) => flight.status === statusFilter)
  : allFlights;

  const handleDelete = (id) => {
    const confirmToast = () => (
      <div>
        <p>Are you sure you want to delete this flight?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            className="cursor-pointer bg-green-500 text-white py-[5px] px-[10px] rounded-[5px]"
            onClick={async () => {
              await deleteFlight(id);
              refetch();
              toast.dismiss();
              toast.success("Flight deleted successfully!", {
                position: "top-center",
              });
            }}
          >
            Yes
          </button>
          <button
            className="cursor-pointer bg-red-600 text-white py-[5px] px-[10px] rounded-[5px]"
            onClick={() => toast.dismiss()}
          >
            No 
          </button>
        </div>
      </div>
    );

    toast.error(confirmToast, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  if (isLoading) return <p>Loading flights...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={refetch} 
        sx={{ marginBottom: 2 }}
      >
        Refresh Flights
      </Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsField.map((column) => (
                <TableCell key={column} align={column}>
                  {column != "actions" ? (
                    <TableSortLabel
                      active={sortField === column}
                      direction={sortField === column ? sortOrder : "asc"}
                      onClick={() => handleSort(column)}
                    >
                      {column}
                    </TableSortLabel>
                  ) : (
                    column
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlights.map((flight, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={flight.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  <TableCell>{flight.id}</TableCell>
                  <TableCell>{flight.from}</TableCell>
                  <TableCell>{flight.to}</TableCell>
                  <TableCell>{flight.date}</TableCell>
                  <TableCell>{flight.time}</TableCell>
                  <TableCell>{flight.status}</TableCell>

                  <TableCell>
                    <EditIcon
                      onClick={() => handleOpen(flight)}
                      className="cursor-pointer text-gray-300 mr-0.5"
                    />
                    <DeleteIcon
                      onClick={() => handleDelete(flight.id)}
                      className="cursor-pointer text-gray-300"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <EditModal
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSave={handleSave}
        currentFlight={currentFlight}
      />
    </>
  );
};

export default FlightsTable;
