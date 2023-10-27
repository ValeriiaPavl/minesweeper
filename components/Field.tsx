import React, { useState } from "react";

interface CellProps {
  value: number;
}

const Cell = ({ value }: CellProps) => {
  const [cellCondition, setCondition] = useState<"closed" | "open" | "flagged">(
    "closed"
  );

  if (cellCondition === "open") {
    return (
      <div className="cell cell-open">
        <p>{value}</p>
      </div>
    );
  } else {
    if (cellCondition === "flagged") {
      return (
        <div className="cell cell-flagged">
          <p>{value}</p>
        </div>
      );
    }
    return (
      <div
        onClick={() => setCondition("open")}
        onContextMenu={() => setCondition("flagged")}
        className="cell"
      >
        <p>{value}</p>
      </div>
    );
  }
};

function Field() {
  const range = (start: number, stop: number, step: number): number[] =>
    Array(stop - start + 1)
      .fill(start)
      .map((x, y) => x + y * step);
  const fieldArray = range(1, 72, 1);


  return (
    <div className="cell-container">
      {fieldArray.map((number) => (
        <Cell key={`${number.toString()}_cell`} value={number} />
      ))}
    </div>
  );
}

export default Field;
