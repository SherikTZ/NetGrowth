import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { Button, Box } from "@mui/material";
import AddConnectionPopup from "./AddConnectionPopup"; // We'll create this component

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Connections() {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, [user.id]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_API_URL}/connections/${user.id}/get`,
        {
          withCredentials: true,
        }
      );
      setRows(response.data.map((item) => ({ ...item, id: item._id })));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${VITE_BACKEND_API_URL}/connections/${user.id}/delete`,
        {
          data: { connectionIds: selectedRows },
          withCredentials: true,
        }
      );
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedRows.includes(row.id))
      );
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting connections:", error);
    }
  };

  const handleAddConnection = (newConnection) => {
    setRows((prevRows) => [
      ...prevRows,
      { ...newConnection, id: newConnection._id },
    ]);
    setIsAddPopupOpen(false);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "type", headerName: "Connection Type", width: 130 },
    { field: "position", headerName: "Position", width: 130 },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 100]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        {selectedRows.length > 0 && (
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Selected Connections
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddPopupOpen(true)}
        >
          Add Connection
        </Button>
      </Box>
      <AddConnectionPopup
        open={isAddPopupOpen}
        onClose={() => setIsAddPopupOpen(false)}
        onAdd={handleAddConnection}
        userId={user.id}
      />
    </div>
  );
}
