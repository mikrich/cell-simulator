import { useEffect, useState } from "react";

type Status  =  "nuetral" | "dead" | "alive";
interface Cell {
  id: number;
  status: Status;
}

const colors = {
  nuetral: 'blue',
  dead: 'red',
  alive: 'green'
}

const rowLength = 10;
const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    backgroundColor: "#000",
    display: "grid",
    gridTemplateColumns: `repeat(${rowLength}, 1fr)`,
    columnGap: 3,
    rowGap: 3,
    padding: 3,
  },
  cell: (status: Status) => ({ borderWidth: 0, width: 30, height: 30, backgroundColor: colors[status] })
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

  return (
    <div style={styles.wrapper}>
      <div style={styles.grid}>
        {cells.map(({ id, status }) => (
          <button style={styles.cell(status)}>{id}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
