import { useEffect, useState } from "react";

type Status = "nuetral" | "dead" | "alive";
interface Cell {
  id: number;
  status: Status;
}

const colors = {
  nuetral: "#E0F4FF",
  dead: "#F6E1DC",
  alive: "#C5F5D4",
};

const rowLength = 10;
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
  button: {
    paddingTop: 10,
  },
};

function App() {
  const [cells, setCells] = useState<Cell[]>([]);
  const createCells = (): Cell[] => {
    return Array.from({ length: 100 }, (_, i) => {
      return { id: i + 1, status: "nuetral" };
    });
  };

  useEffect(() => {
    if (!cells.length) {
      setCells(createCells());
    }
  }, [cells]);

  const getStatus = (status: Status): Status => {
    const statusMap = {
      nuetral: "alive",
      alive: "dead",
      dead: "nuetral",
    };

    return statusMap[status] as Status;
  };

  const setCellStatus = (id: number, status: Status) => {
    const updatedCells = cells.map((cell) => {
      return cell.id === id ? { ...cell, status: getStatus(status) } : cell;
    });

    setCells(updatedCells);
  };

  const resetCells = () => {
    setCells(createCells());
  };

  const nextGeneration = () => {
    cells.map((cell) => {
      console.log(cell);
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        {cells.map(({ id, status }) => (
          <button
            type="button"
            onClick={() => setCellStatus(id, status)}
            style={styles.cell(status)}
          />
        ))}
      </div>
      <div style={styles.button}>
        <button onClick={resetCells}>RESET</button>
        <button onClick={nextGeneration} title="next generation">
          NEXT GENERATION
        </button>
      </div>
    </div>
  );
}

export default App;
