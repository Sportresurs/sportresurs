import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders about us", () => {
    render(<Home />);

    const aboutUsHeading = screen.getByText("Про нас");

    expect(aboutUsHeading).toBeInTheDocument();
  });
});
