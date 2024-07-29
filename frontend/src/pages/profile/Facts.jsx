import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { Button, Box } from "@mui/material";
import AddFactPopup from "./AddFactPopup";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from "../../themes/mainTheme";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Facts() {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  useEffect(() => {
    fetchFacts();
  }, [user.id]);

  const fetchFacts = async () => {
    try {
      const response = await axios.get(
        `${VITE_BACKEND_API_URL}/facts/${user.id}/get`,
        {
          withCredentials: true,
        }
      );
      setRows(response.data.map((item) => ({ ...item, id: item._id })));
    } catch (error) {
      console.error("Error fetching facts:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${VITE_BACKEND_API_URL}/facts/${user.id}/delete`, {
        data: { factIds: selectedRows },
        withCredentials: true,
      });
      setRows((prevRows) =>
        prevRows.filter((row) => !selectedRows.includes(row.id))
      );
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting facts:", error);
    }
  };

  const handleAddFact = (newFact) => {
    setRows((prevRows) => [...prevRows, { ...newFact, id: newFact._id }]);
    setIsAddPopupOpen(false);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "body", headerName: "Body", width: 400 },
    { field: "date", headerName: "Date", width: 130 },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <ThemeProvider theme={mainTheme}>
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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete Selected Facts
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAddPopupOpen(true)}
          >
            Add Fact
          </Button>
        </Box>
        <AddFactPopup
          open={isAddPopupOpen}
          onClose={() => setIsAddPopupOpen(false)}
          onAdd={handleAddFact}
          userId={user.id}
        />
      </ThemeProvider>
    </div>
  );
}
