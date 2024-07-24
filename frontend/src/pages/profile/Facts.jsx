import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Facts() {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await axios.get(
          `${VITE_BACKEND_API_URL}/facts/${user.id}/get`,
          {
            withCredentials: true,
          }
        );
        setRows(
          response.data.map((item) => ({
            ...item,
            id: item._id,
            date: item.date ? new Date(item.date) : null,
          }))
        );
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    };

    fetchFacts();
  }, [user.id]);

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "body", headerName: "Fact Body", width: 300 },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      type: "date",
      valueGetter: (params) => (params.value ? new Date(params.value) : null),
    },
  ];

  return (
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
    />
  );
}
