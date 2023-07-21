import { useState } from "react"
import { Routes, Route } from "react-router-dom"
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
import Team from "./scenes/team"
import Bar from "./scenes/bar"
import Line from "./scenes/line"
import Pie from "./scenes/pie"

import PrivateRoutes from "./components/Privateroute"
import PostgreSQL from "./scenes/assignments/postgresql"
import Cassandra from "./scenes/assignments/cassandra"

import { CssBaseline, ThemeProvider } from "@mui/material"
import { ColorModeContext, useMode } from "./theme"
import Neo4J from "./scenes/assignments/neo4j"
import MongoDB from "./scenes/assignments/mongodb"
//import ExampleForm from "./DB/Example/form";
import SignUp from "./Sign-in/SignUp"
import SignIn from "./Sign-in/signIn"
//import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import MovieList from "./components/TestComponents/Movies"

function App() {
  const [theme, colorMode] = useMode()
  const [isSidebar, setIsSidebar] = useState(true)
  let auth = localStorage.getItem("token")

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {auth && <Sidebar isSidebar={isSidebar} />}

          <main className="content">
            <TopBar setIsSidebar={setIsSidebar} />
            {/* <ToastContainer /> */}
            {/* <Router> */}
            <Routes>
              {/*   <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/postgresql" element={<PostgreSQL />} />
                <Route path="/cassandra" element={<Cassandra />} />
                <Route path="/neo4j" element={<Neo4J />} />
                <Route path="/mongodb" element={<MongoDB />} />
              </Route> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/postgresql" element={<PostgreSQL />} />
              <Route path="/cassandra" element={<Cassandra />} />
              <Route path="/neo4j" element={<Neo4J />} />
              <Route path="/mongodb" element={<MongoDB />} />

              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />

              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              {/* Example Components to test functionalities */}
              {/*  <Route path="/example" element={<ExampleForm />} /> */}
              {/* <Route path="/example" element={<MovieList />} /> */}
            </Routes>{" "}
            {/* </Router> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
