import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("About Us section on Home page renders correctly", () => {
    render(<Home />);

    const aboutUsHeading = screen.getByText("Про нас");

    expect(aboutUsHeading).toBeInTheDocument();
  });
});
