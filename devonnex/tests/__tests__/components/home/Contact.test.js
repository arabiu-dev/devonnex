import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Contact from "../../../../components/home/Contact";

jest.mock("../../../../utils/Icons", () => ({
  CallOutline: () => <></>,
}));

describe("Contact component", () => {
  test("renders section title and section text correctly", () => {
    render(<Contact />);

    const sectionTitle = screen.getByText(/Have Question \? Get in touch!/i);
    const sectionText = screen.getByText(/Get in touch with our team/i);

    expect(sectionTitle).toBeInTheDocument();
    expect(sectionText).toBeInTheDocument();
  });

  test("renders 'Contact us' link correctly", () => {
    render(<Contact />);

    const contactLink = screen.getByRole("link", { name: /Contact us/i });

    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "#");
  });
});
