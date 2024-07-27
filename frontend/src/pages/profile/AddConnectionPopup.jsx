import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const connectionTypes = [
  "Colleague",
  "Mentor",
  "Mentee",
  "Industry Peer",
  "Classmate",
  "Former Classmate",
  "Networking Contact",
  "Industry Influencer or Leader",
  "Academic Contact",
  "Other",
];

export default function AddConnectionPopup({ open, onClose, onAdd, userId }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [otherType, setOtherType] = useState("");
  const [position, setPosition] = useState("");

  console.log("userId", userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalType = type === "Other" ? otherType : type;
    try {
      const response = await axios.post(
        `${VITE_BACKEND_API_URL}/connections/${userId}/post`,
        { name, type: finalType, position },
        { withCredentials: true }
      );
      onAdd(response.data);
      setName("");
      setType("");
      setOtherType("");
      setPosition("");
    } catch (error) {
      console.error("Error adding connection:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Connection</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Connection Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              {connectionTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {type === "Other" && (
            <TextField
              margin="dense"
              label="Specify Other Connection Type"
              type="text"
              fullWidth
              value={otherType}
              onChange={(e) => setOtherType(e.target.value)}
              required
            />
          )}
          <TextField
            margin="dense"
            label="Position"
            type="text"
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
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
