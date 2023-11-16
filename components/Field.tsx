import React, { useState } from "react";
import { useEffect } from "react";

interface cellProps {
  cellNumber: number;
  cellState: "open" | "closed" | "flagged";
  cellContent: "💣" | number | "";
  onClick: (cellNumber: number) => void;
  onContextMenu: (cellNumber: number) => void;
}

interface CellData {
  cellNumber: number;
  cellState: "open" | "closed" | "flagged";
  cellContent: "💣" | number | "";
}

const Cell = ({
  cellNumber,
  cellState,
  cellContent,
  onClick,
  onContextMenu,
}: cellProps) => {
  const cellText = "";

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick(cellNumber);
    console.log("Cell is open!");
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onContextMenu(cellNumber);
    console.log("Cell is flagged!");
  };

  if (cellState === "open") {
    return (
      <div className="cell cell-open">
        <p className="emodji">{cellContent}</p>
      </div>
    );
  } else {
    if (cellState === "flagged") {
      return (
        <div className="cell cell-flagged">
          <p className="emodji">🚩</p>
        </div>
      );
    }
    return (
      <div
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className="cell cell-closed"
      >
        <p className="emodji">{cellText}</p>
      </div>
    );
  }
};

function Field() {
  const range = (start: number, stop: number, step: number): number[] =>
    Array(stop - start + 1)
      .fill(start)
      .map((x, y) => x + y * step);
  const fieldArray = range(1, 72, 1); //generates numbers for the field cells

  // generate 10 random mines
  const getMines = () => {
    const randomNumber = (minN: number, maxN: number): number =>
      Math.floor(Math.random() * (maxN - minN) + minN);

    const minesList = () => {
      const mines = new Set<number>();
      for (let i = 0; i < 10; i++) {
        while (true) {
          let randomN = randomNumber(1, 72);
          if (mines.has(randomN)) {
            console.log(randomN);
            randomN = randomNumber(1, 72);
          } else {
            mines.add(randomN);
            break;
          }
        }
      }
      console.log(mines);
      return mines;
    };
    return minesList();
  };

  const randomMines = getMines();
  console.log(randomMines);

  // counts bombs around one cell
  const bombAround = (currentCell: number) => {
    const allNeighbors = [
      currentCell + 9,
      currentCell - 9,
      currentCell + 1,
      currentCell - 1,
      currentCell + 9 - 1,
      currentCell + 9 + 1,
      currentCell - 9 + 1,
      currentCell + 9 - 1,
    ];
    const containBomb = (cell: number) => (randomMines.has(cell) ? 1 : 0);

    const bombCount = allNeighbors
      .map((cell: number): number => containBomb(cell))
      .reduce((acc, currentValue) => acc + currentValue, 0);
    if (bombCount > 0) {
      return bombCount;
    } else {
      return "";
    }
  };

  const defineCellContent = (cellNumber: number) => {
    if (randomMines.has(cellNumber)) {
      return "💣";
    } else {
      return bombAround(cellNumber);
    }
  };

  const fieldArrayData = fieldArray.map((cell: number): CellData => {
    return {
      cellNumber: cell,
      cellState: "closed",
      cellContent: defineCellContent(cell),
    };
  });

  const [field, setFieldState] = useState<CellData[]>(fieldArrayData);

  const handleContextMenu = (cellN: number) => {
    setFieldState((prevFieldState) =>
      prevFieldState.map((cell: CellData) =>
        cell.cellNumber === cellN ? { ...cell, cellState: "flagged" } : cell
      )
    );
  };

  const handleClick = (cellN: number) => {
    setFieldState((prevFieldState) =>
      prevFieldState.map((cell: CellData) =>
        cell.cellNumber === cellN ? { ...cell, cellState: "open" } : cell
      )
    );
    console.log("Hello");
  };

  return (
    <div className="cell-container">
      {field.map((cell: CellData) => (
        <Cell
          key={`${cell.cellNumber.toString()}_cell`}
          cellNumber={cell.cellNumber}
          cellState={cell.cellState}
          cellContent={cell.cellContent}
          onClick={() => handleClick(cell.cellNumber)}
          onContextMenu={() => handleContextMenu(cell.cellNumber)}
        />
      ))}
    </div>
  );
}

export default Field;
