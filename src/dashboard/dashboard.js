/* Author: Vanessa Meyer */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "./dashboardCard";
import logoPostgreSQL from '../images/logo-postgresql.png'
import logoCassandra from '../images/logo-cassandra.png'
import logoNeo4J from '../images/logo-neo4j.png'
import logoMongoDB from '../images/logo-mongodb.png'

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [cardTitle, setCardTitle] = useState("");
  const [cardContent, setCardContent] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCard = { title: cardTitle, content: cardContent };
    setCards([...cards, newCard]);
    setCardTitle("");
    setCardContent("");
  };

  const handleDelete = (title) => {
    if (title === "PostgreSQL" || title === "Cassandra" || title === "Neo4J" || title === "MongoDB"){
      alert("Do not delete this card.")
    }
    
    else if (window.confirm("Do you really want to delete the card?")) {
      const updatedCards = cards.filter((card) => card.title !== title);
      setCards(updatedCards);
    }
  };
//TODO DashboardCards: Array with database names and content -> forEach item => DashboardCard
  return (
    <div>
      <div className="content" id="card-container">
      <div className="box">
            <DashboardCard
              key="PostgreSQL"
              title="PostgreSQL"
              content={<img src={logoPostgreSQL} alt="Logo PostgreSQL"></img>}
              onDelete={handleDelete}
            />
          </div>
      <div className="box">
            <DashboardCard
              key="Cassandra"
              title="Cassandra"
              content={<img src={logoCassandra} alt="Logo Cassandra"></img>}
              onDelete={handleDelete}
            />
          </div>
      <div className="box">
            <DashboardCard
              key="Neo4J"
              title="Neo4J"
              content={<img id="img-neo4j" src={logoNeo4J} alt="Logo Neo4J"></img>}
              onDelete={handleDelete}
            />
          </div>
      <div className="box">
            <DashboardCard
              key="MongoDB"
              title="MongoDB"
              content={<img id="img-mongodb" src={logoMongoDB} alt="Logo MongoDB"></img>}
              onDelete={handleDelete}
            />
          </div>
        {cards.map((card, index) => (
          <div className="box" key={index}>
            <DashboardCard
              key={card.title}
              title={card.title}
              content={card.content}
              onDelete={handleDelete}
            />
          </div>
        ))}
        <div className="box">
          <h2>Add new card</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
            />
            <br></br>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={cardContent}
              onChange={(e) => setCardContent(e.target.value)}
            />
            <button type="submit">Add Card</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
