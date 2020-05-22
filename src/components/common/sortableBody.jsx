import React from "react";
import SortableComponent from "./sortable/sortableComponent";

const SortableBody = ({ columns, data, selectedRange, onSetData }) => {
  return (
    <SortableComponent
      columns={columns}
      data={data}
      selectedRange={selectedRange}
      onSetData={onSetData}
    />
  );
};

export default SortableBody;
