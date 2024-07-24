import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Connections() {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
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

    fetchConnections();
  }, [user.id]);

  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "type", headerName: "Connection Type", width: 130 },
    { field: "position", headerName: "Position", width: 130 },
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
