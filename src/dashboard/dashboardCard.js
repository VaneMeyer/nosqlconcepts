/* Author: Vanessa Meyer */
import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, content, onDelete }) => {
  const handleDelete = () => {
    onDelete(title); // Pass the title to the onDelete function
  };

  // check which assignment (card title) to link to corresponding tasks
  let isPostgreSQL = false;
  if (title === "PostgreSQL") {
    isPostgreSQL = true;
  }
  let isCassandra = false;
  if (title === "Cassandra") {
    isCassandra = true;
  }
  let isNeo4J = false;
  if (title === "Neo4J") {
    isNeo4J = true;
  }
  let isMongoDB = false;
  if (title === "MongoDB") {
    isMongoDB = true;
  }
  let isMultipleChoice = false;
  if (title === "Multiple Choice") {
    isMultipleChoice = true;
  }
  let isGapText = false;
  if (title === "Gap Text") {
    isGapText = true;
  }
  let isIntro = false;
  if (title === "Introduction") {
    isIntro = true;
  }
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      {!isPostgreSQL &&
        !isCassandra &&
        !isNeo4J &&
        !isMongoDB &&
        !isMultipleChoice &&
        !isGapText &&
        !isIntro && <button onClick={handleDelete}>Delete</button>}

      {isPostgreSQL && (
        <Link to="/postgresql">
          <button>Start</button>
        </Link>
      )}
      {isCassandra && (
        <Link to="/cassandra">
          <button>Start</button>
        </Link>
      )}
      {isNeo4J && (
        <Link to="/neo4j">
          <button>Start</button>
        </Link>
      )}
      {isMongoDB && (
        <Link to="/mongodb">
          <button>Start</button>
        </Link>
      )}
      {isMultipleChoice && (
        <Link to="/multiple-choice">
          <button>Start</button>
        </Link>
      )}
      {isGapText && (
        <Link to="/gap-text">
          <button>Start</button>
        </Link>
      )}
      {isIntro && (
        <Link to="/gap-text">
          <button>Read</button>
        </Link>
      )}
    </div>
  );
};

export default DashboardCard;
