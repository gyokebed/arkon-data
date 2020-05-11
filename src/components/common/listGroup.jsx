import React from "react";

const ListGroup = ({ ranges }) => {
  return (
    <ul className="list-group">
      {ranges.map((range) => (
        <li className="list-group-item" key={range._id}>
          {range.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
