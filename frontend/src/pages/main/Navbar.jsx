import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import mainTheme from "../../themes/mainTheme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import AuthContext from "../../contexts/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ height: "5vh" }} position="static">
          <nav>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {isLoggedIn ? (
                <>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      handleNavigation(`/profile/${user.username}`)
                    }
                  >
                    {user.username}
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => handleNavigation("/logout")}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    variant="text"
                    onClick={() => handleNavigation("/login")}
                  >
                    Log In
                  </Button>
                  <Button
                    color="info"
                    variant="contained"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </nav>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
