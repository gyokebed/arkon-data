import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = () => {
  return (
    <table className="table">
      <TableHeader />
      <TableBody />
    </table>
  );
};

export default Table;
