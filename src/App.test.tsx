import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const aliveBg = "#C5F5D4";
const deadBg = "#E0F4FF";

test("renders 100 cells", () => {
  render(<App />);
  expect(screen.queryAllByTitle("cell")).toHaveLength(100);
});

test("it activates cell on click", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("button-50"));
  expect(screen.getByTestId("button-50")).toHaveStyle({
    backgroundColor: aliveBg,
  });
});

test("it de-activates cell on second click", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("button-50"));
  expect(screen.getByTestId("button-50")).toHaveStyle({
    backgroundColor: aliveBg,
  });

  fireEvent.click(screen.getByTestId("button-50"));
  expect(screen.getByTestId("button-50")).toHaveStyle({
    backgroundColor: deadBg,
  });
});

test("it resets board", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("button-50"));
  expect(screen.getByTestId("button-50")).toHaveStyle({
    backgroundColor: aliveBg,
  });

  fireEvent.click(screen.getByText("RESET"));
  expect(screen.getByTestId("button-50")).toHaveStyle({
    backgroundColor: deadBg,
  });
});

test("it spawns cell when three neighbours", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("button-54"));
  fireEvent.click(screen.getByTestId("button-55"));
  fireEvent.click(screen.getByTestId("button-56"));

  fireEvent.click(screen.getByText("NEXT GENERATION"));

  expect(screen.getByTestId("button-45")).toHaveStyle({
    backgroundColor: aliveBg,
  });
  expect(screen.getByTestId("button-55")).toHaveStyle({
    backgroundColor: aliveBg,
  });
  expect(screen.getByTestId("button-65")).toHaveStyle({
    backgroundColor: aliveBg,
  });
});

test("it kills cell when 2 or less neighbours", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("button-54"));
  fireEvent.click(screen.getByTestId("button-55"));

  fireEvent.click(screen.getByText("NEXT GENERATION"));

  expect(screen.getByTestId("button-54")).toHaveStyle({
    backgroundColor: deadBg,
  });
  expect(screen.getByTestId("button-55")).toHaveStyle({
    backgroundColor: deadBg,
  });
});


test("it kills cell when more than 3 neighbours", () => {
  render(<App />);

  fireEvent.click(screen.getByTestId("button-54"));
  fireEvent.click(screen.getByTestId("button-55"));
  fireEvent.click(screen.getByTestId("button-56"));
  fireEvent.click(screen.getByTestId("button-64"));
  fireEvent.click(screen.getByTestId("button-65"));

  fireEvent.click(screen.getByText("NEXT GENERATION"));

  expect(screen.getByTestId("button-65")).toHaveStyle({
    backgroundColor: deadBg,
  });
});
