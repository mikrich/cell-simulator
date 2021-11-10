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
};

function App() {
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    // create cells on initial render
    if (!cells.length) {
      setCells(
        Array.from({ length: 100 }, (_, i) => {
          return { id: i + 1, status: "nuetral" };
        })
      );
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
  const updateCellStatus = (id: number, status: Status) => {
    const updatedCells = cells.map((cell) => {
      return cell.id === id ? { ...cell, status: getStatus(status) } : cell;
    });

    setCells(updatedCells);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        {cells.map(({ id, status }) => (
          <button
            type="button"
            onClick={() => updateCellStatus(id, status)}
            style={styles.cell(status)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
