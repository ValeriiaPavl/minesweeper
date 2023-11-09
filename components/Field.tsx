import React, { useState } from "react";
import { useEffect } from "react";

interface cellProps {
  cellNumber: number;
  cellState: "open" | "closed" | "flagged";
  cellContent: "💣" | number | "";
  onClick: () => void;
  onContextMenu: () => void;
}

const Cell = ({
  cellNumber,
  cellState,
  cellContent,
  onClick,
  onContextMenu,
}: cellProps) => {
  const cellText = "";

  const handleClick = () => {
    onClick();
    console.log("Cell is open!");
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    onContextMenu();
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
  const fieldArray = range(1, 72, 1);

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

  const bombAround = (currentCell: number) => {
    const all_neighbors = [
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
    const bombCount = all_neighbors
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

  const fieldArrayData = fieldArray.map((cell: number): cellProps => {
    return {
      cellNumber: cell,
      cellState: "closed",
      cellContent: defineCellContent(cell),
    };
  });

  return (
    <div className="cell-container">
      {fieldArrayData.map((cell: cellProps) => (
        <Cell
          key={`${cell.cellNumber.toString()}_cell`}
          cellNumber={cell.cellNumber}
          cellState={cell.cellState}
          cellContent={cell.cellContent}
          onClick={() => console.log("done click")}
          onContextMenu={() => console.log("done context menu")}
        />
      ))}
    </div>
  );
}

export default Field;
