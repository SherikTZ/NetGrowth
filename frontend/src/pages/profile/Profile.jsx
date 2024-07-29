import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Dashboard from "./Dashboard";
import Connections from "./Connections";
import Facts from "./Facts";
import { CssBaseline } from "@mui/material";
import mainTheme from "../../themes/mainTheme";
import { ThemeProvider } from "@mui/material/styles";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
        >
          <Tab label="Dashboard" />
          <Tab label="Connections" />
          <Tab label="Facts" />
        </Tabs>
        {activeTab === 0 && <Dashboard />}
        {activeTab === 1 && <Connections />}
        {activeTab === 2 && <Facts />}
      </ThemeProvider>
    </Box>
  );
}
