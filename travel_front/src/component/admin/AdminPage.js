import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/SidebarComponent";
import './admin.css'

import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import User from "./scenes/user";
import Invoices from "./scenes/invoices";
import Weather from "./scenes/weather";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Edit from "./scenes/edit";
import ViewTours from "./scenes/viewAll";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";



const AdminDashBoard = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="admin-div">
          <div id="main-div">

            <div id="sidebar-div">
              <Sidebar isSidebar={isSidebar} />
            </div>

            <div id="content-div">
              <div className="admin-content">
                {/* <Topbar setIsSidebar={setIsSidebar} /> */}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/weatherpage" element={<Weather/>}></Route>
                  <Route path="/form" element={<Form />} />
                  <Route path="/edit" element={<Edit />} />
                  <Route path="/viewTours" element={<ViewTours />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/line" element={<Line />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/geography" element={<Geography />} />
                </Routes>
              </div>
            </div>

          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default AdminDashBoard