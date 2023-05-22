/* Author: Vanessa Meyer */
import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, content, onDelete }) => {
  const handleDelete = () => {
    onDelete(title); // Pass the title to the onDelete function
  };

  // check which assignment (card title) to link to corresponding tasks
let isPostgreSQL = false;
if (title === "PostgreSQL"){
  isPostgreSQL = true;
}
let isCassandra = false;
if (title === "Cassandra"){
  isCassandra = true;
}
let isNeo4J = false;
if (title === "Neo4J"){
  isNeo4J = true;
}
let isMongoDB = false;
if (title === "MongoDB"){
  isMongoDB = true;
}
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={handleDelete}>Delete</button>
      { isPostgreSQL && <Link to="/postgresql">
        <button>Exercises</button>
      </Link>}
      { isCassandra && <Link to="/cassandra">
        <button>Exercises</button>
      </Link>}
      { isNeo4J && <Link to="/neo4j">
        <button>Exercises</button>
      </Link>}
      { isMongoDB && <Link to="/mongodb">
        <button>Exercises</button>
      </Link>}
     
    </div>
  );
};

export default DashboardCard;
