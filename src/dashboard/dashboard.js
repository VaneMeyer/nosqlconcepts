/* Author: Vanessa Meyer */
import React, { useState } from "react";
import DashboardCard from "./dashboardCard";

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
    const updatedCards = cards.filter((card) => card.title !== title);
    setCards(updatedCards);
  };

  return (
    <div>
      <div className="content" id="card-container">
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

