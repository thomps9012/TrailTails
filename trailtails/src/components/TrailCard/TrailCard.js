import React from 'react';
import "./style.css";

function TrailCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img
          alt={props.name}
          src={props.image}
        />
      </div>
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Length:</strong> {props.length}
          </li>
          <li>
            <strong>Stars:</strong> {props.stars}
          </li>
          <li>
            <strong>Condition:</strong> {props.condition}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TrailCard;