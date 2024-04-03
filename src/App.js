import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import PrivateRoutes from "./components/Privateroute";
import PostgreSQL from "./scenes/assignments/postgresql";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Neo4J from "./scenes/assignments/neo4j";
import Cassandra from "./scenes/assignments/cassandra";
import MongoDB from "./scenes/assignments/mongodb";
import PgLogin from "./components/pgLogin";
import OptDownload from "./components/optDownload";
import StatisticsMain from "./Statistics/statisticsMain";
import Navigation from "./components/testWebDisability";
import History from "./components/History";
import AdminC from "./components/admin";
import { Lab1C, Lab2C } from "./scenes/assignments/lab";

function App() {
  const [theme, colorMode] = useMode();
  useEffect(() => {
    document.title = "NoSQLconcepts";
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <main className="content">
            <TopBar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/postgresql" element={<PostgreSQL />} />
                <Route path="/cassandra" element={<Cassandra />} />
                <Route path="/neo4j" element={<Neo4J />} />
                <Route path="/mongodb" element={<MongoDB />} />
                <Route path="/lab1" element={<Lab1C />} />
                <Route path="/lab2" element={<Lab2C />} />
                <Route path="/download" element={<OptDownload />} />
                <Route path="/statistics" element={<StatisticsMain />} />
                <Route path="/history" element={<History />} />
                {localStorage.getItem("role") === "admin" && (
                  <Route path="/admin" element={<AdminC />} />
                )}
              </Route>

              <Route path="/signin" element={<PgLogin />} />
              <Route path="/example" element={<Navigation />} />
            </Routes>{" "}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
