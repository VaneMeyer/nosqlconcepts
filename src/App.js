import { Routes, Route } from "react-router-dom";
import TopBar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
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

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<PgLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/postgresql" element={<PostgreSQL />} />
                <Route path="/cassandra" element={<Cassandra />} />
                <Route path="/neo4j" element={<Neo4J />} />
                <Route path="/mongodb" element={<MongoDB />} />
                <Route path="/download" element={<OptDownload />} />
              </Route>

              <Route path="/signin" element={<PgLogin />} />
            </Routes>{" "}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
