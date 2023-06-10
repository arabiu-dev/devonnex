import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Hero from "../../../../components/home/Hero";

describe("Hero component", () => {
  test("renders headline and section text correctly", () => {
    render(<Hero />);

    const headline = screen.getByText(
      /Explore a world of skilled freelancers./i
    );
    const sectionText = screen.getByText(
      /Embrace the freelance community that fuels collaboration/i
    );

    expect(headline).toBeInTheDocument();
    expect(sectionText).toBeInTheDocument();
  });

  test("renders 'Get Started' link correctly", () => {
    render(<Hero />);

    const getStartedLink = screen.getByRole("link", { name: /Get Started/i });

    expect(getStartedLink).toBeInTheDocument();
    expect(getStartedLink).toHaveAttribute("href", "/auth/login");
  });
});
