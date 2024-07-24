import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Dashboard from "./Dashboard";
import Connections from "./Connections";
import Facts from "./Facts";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <Tabs orientation="vertical" value={activeTab} onChange={handleTabChange}>
        <Tab label="Dashboard" />
        <Tab label="Connections" />
        <Tab label="Facts" />
      </Tabs>
      {activeTab === 0 && <Dashboard />}
      {activeTab === 1 && <Connections />}
      {activeTab === 2 && <Facts />}
    </Box>
  );
}
