/* Author: Vanessa Meyer */
import React, { useState } from "react";

const DashboardCard = ({ title, content, onDelete }) => {
  const handleDelete = () => {
    onDelete(title); // Pass the title to the onDelete function
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DashboardCard;