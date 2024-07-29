import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function AddFactPopup({ open, onClose, onAdd, userId }) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState("");

  console.log("userId", userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${VITE_BACKEND_API_URL}/facts/${userId}/post`,
        { name, body, date, userId },
        { withCredentials: true }
      );
      onAdd(response.data);
      setName("");
      setBody("");
      setDate("");
    } catch (error) {
      console.error("Error adding fact:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Fact</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Fact Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Fact Body"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
