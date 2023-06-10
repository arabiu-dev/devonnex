import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import Creators from "../../../../components/home/Creators";
import fetchMock from "jest-fetch-mock";

jest.mock("../../../../utils/Icons", () => ({
  CheckmarkCircle: () => <></>,
  PersonAddOutline: () => <></>,
}));

jest.mock("next/image", () => ({ src, alt }) => (
  <img src={src} alt={alt} data-testid="image" />
));

jest.spyOn(global, "fetch").mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue([
    {
      id: 1,
      full_name: "John Doe",
      username: "johndoe",
      image_url: "image1",
    },
    {
      id: 2,
      full_name: "Jane Smith",
      username: "janesmith",
      image_url: "image2",
    },
  ]),
});

describe("Creators Component", () => {
  it("should render data correctly", async () => {
    await act(async () => {
      render(<Creators />);
    });

    // Assertions
    expect(screen.getByText("Best Creators & Sellers")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("@janesmith")).toBeInTheDocument();
    expect(screen.getByTestId("image")).toHaveAttribute(
      "src",
      "https://res.cloudinary.com/dqzvvp77h/image/upload/w_64,h_64/image1.jpg"
    );
    expect(screen.getByTestId("image")).toHaveAttribute(
      "alt",
      "John Doe profile"
    );
    expect(screen.getByTestId("checkmark-circle")).toBeInTheDocument();
    expect(screen.getByTestId("person-add-outline")).toBeInTheDocument();
  });
});
