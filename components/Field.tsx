import React, { useState } from "react";

interface CellProps {
  value: number;
  key: string;
}

const Cell = ({ value, key }: CellProps) => {
  const [cellOpened, setOpen] = useState<boolean>(false);

  return (
    <>
      {cellOpened ? (
        <div key={key} className="cell cell-open">
          <p>{value}</p>
        </div>
      ) : (
        <div key={key} onClick={() => setOpen(true)} className="cell">
          <p>{value}</p>
        </div>
      )}
    </>
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
