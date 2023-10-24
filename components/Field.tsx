import React from "react";

interface CellProps {
  value: number;
  key: string;
}

const Cell = ({ value, key }: CellProps) => {
  return (
    <div className="cell" key={key}>
      <p>{value}</p>
    </div>
  );
};

function Field() {
  const range = (start: number, stop: number, step: number): number[] =>
    Array(stop - start + 1)
      .fill(start)
      .map((x, y) => x + y * step);
  const fieldArray = range(1, 72, 1);
  const fieldItems = fieldArray.map((number) => (
    <Cell key={"{number.toString()}_cell"} value={number} />
  ));
  return <div className="cell-container">{fieldItems}</div>;
}

export default Field;
