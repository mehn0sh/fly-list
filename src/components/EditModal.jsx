import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const EditModal = ({open,handleClose,currentFlight,handleChange,handleSave={handleSave}}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Edit Flight</h2>
        <TextField
          label="From"
          name="from"
          value={currentFlight?.from || ""}
          onChange={(e)=>handleChange(e)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="To"
          name="to"
          value={currentFlight?.to || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          name="date"
          value={currentFlight?.date || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Time"
          name="time"
          value={currentFlight?.time || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
