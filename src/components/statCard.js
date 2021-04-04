import React from "react";

const StatCard = (props) => {
  return (
    <div className="statCard">
      <p className="headingText">{props.details.heading.toUpperCase()}</p>
      <p className="valueText">{props.details.value}</p>
    </div>
  );
};

export default StatCard;
