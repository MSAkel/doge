import React from "react";

const Card = ({ name, number }) => {
  return (
    <div className="card-container">
      <div className="card-content">
        <h2>{name}</h2>
        <h2>{number}</h2>
      </div>
    </div>
  );
};

export default Card;
