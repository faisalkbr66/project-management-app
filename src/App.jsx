import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "@/components/pages/Auth/Login/Login";
import Dashboard from "@/components/pages/dashboard/dashboard";
import DetailProject from "@/components/pages/Projects/DetailProject/DetailProject";
import Projects from "@/components/pages/Projects/Projects";
import Settings from "@/components/pages/Settings/Settings";

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/projects/:id",
    element: <DetailProject />,
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
