import { useEffect, useState } from "react";

type Status = "dead" | "alive";
interface Cell {
  id: number;
  status: Status;
}

interface Cells {
  [key: number]: Cell;
}

const colors = {
  dead: "#E0F4FF",
  alive: "#C5F5D4",
};

const rowLength = 10;
const numberOfCells = 100;

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column" as const,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: `repeat(${rowLength}, 1fr)`,
    columnGap: 3,
    rowGap: 3,
    padding: 3,
  },
  cell: (status: Status) => ({
    cursor: "pointer",
    borderWidth: 0,
    width: 30,
    height: 30,
    backgroundColor: colors[status],
  }),
  buttons: {
    paddingTop: 10,
  },
};

function App() {
  const [cellsObj, setCellsObj] = useState<Cells>({});
  const createCellsObj = () => {
    return Array.from({ length: numberOfCells }, (_, i) => i + 1).reduce(
      (acc, id) => {
        return { ...acc, [id]: { status: "dead", id } };
      },
      {}
    );
  };

  useEffect(() => {
    if (!Object.keys(cellsObj).length) {
      setCellsObj(createCellsObj());
    }
  }, [cellsObj]);

  const getStatus = (status: Status): Status => {
    const statusMap = {
      alive: "dead",
      dead: "alive",
    };

    return statusMap[status] as Status;
  };

  const setCellStatus = (id: number, status: Status) => {
    setCellsObj({
      ...cellsObj,
      [id]: { ...cellsObj[id], status: getStatus(status) },
    });
  };

  const resetCells = () => {
    setCellsObj(createCellsObj());
  };

  const getRow = (id: number) => Math.ceil(id / rowLength);
  const isOnSameRow = (cellId: number, neighbourId: number) => {
    return getRow(cellId) === getRow(neighbourId);
  };

  const getValidCell = (cellId: number, neighbourId: number) => {
    // check cell appears on the same row otherwise return 0
    return isOnSameRow(cellId, neighbourId) ? neighbourId : 0;
  };

  const getNeighbours = (id: number): number[] => {
    const top = id - rowLength > 0 ? id - rowLength : 0;
    const bottom = id + rowLength < numberOfCells ? id + rowLength : 0;

    const left = getValidCell(id, id - 1);
    const right = getValidCell(id, id + 1);
    const topLeft = top && getValidCell(top, top - 1);
    const topRight = top && getValidCell(top, top + 1);
    const bottomLeft = bottom && getValidCell(bottom, bottom - 1);
    const bottomRight = bottom && getValidCell(bottom, bottom + 1);

    return [
      topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight,
    ];
  };

  const nextGeneration = () => {
    const newCellsObj = Object.entries(cellsObj).reduce((acc, [key, cell]) => {
      const activeNeighbours = getNeighbours(cell.id).filter((id) => {
        return cellsObj[id]?.status === "alive";
      });

      // kill cells
      if (activeNeighbours.length > 3 || activeNeighbours.length < 2) {
        return { ...acc, [cell.id]: { ...cell, status: "dead" } };
      }

      // spawn cells
      if (activeNeighbours.length === 3) {
        return { ...acc, [cell.id]: { ...cell, status: "alive" } };
      }

      // cell unchanged
      return { ...acc, [cell.id]: { ...cell } };
    }, {});


    setCellsObj(newCellsObj);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        {Object.entries(cellsObj).map(([key, { status, id }]) => (
          <button
            data-testid={`button-${id}`}
            key={key}
            title="cell"
            type="button"
            onClick={() => setCellStatus(id, status)}
            style={styles.cell(status)}
          />
        ))}
      </div>
      <div style={styles.buttons}>
        <button onClick={resetCells}>RESET</button>
        <button onClick={nextGeneration} title="next generation">
          NEXT GENERATION
        </button>
      </div>
    </div>
  );
}

export default App;
