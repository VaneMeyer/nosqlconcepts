import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import MenuBar from "./dashboard/menubar";
import "./dashboard/dashboard-style.css"
import Testapp from "./LearningApps/testapp";
import SignIn from "./Sign-in/signIn";
import Task from "./assignments/assignments";
import PostgreSQL from "./assignments/postgresql";
import Cassandra from "./assignments/cassandra";
import MongoDB from "./assignments/mongodb";
import Neo4J from "./assignments/neo4j";

function Main() {
  return (
    <div>
      <div>
        <MenuBar />
      </div>
      <div>
        <Routes>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testapp" element={<Testapp/>}/>
          <Route path="/task" element={<Task/>}/>
          <Route path="/postgresql" element={<PostgreSQL/>}/>
          <Route path="/cassandra" element={<Cassandra/>}/>
          <Route path="/neo4j" element={<Neo4J/>}/>
          <Route path="/mongodb" element={<MongoDB/>}/>
        </Routes>
      </div>
    </div>
  );
}
export default Main;
