import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Collection from "../../../../components/home/Collection";

jest.mock("../../../../utils/Icons", () => ({
  ArrowBack: () => <></>,
  ArrowForward: () => <></>,
}));

describe("Collection component", () => {
  test("renders the component with correct titles and buttons", () => {
    render(<Collection />);

    // Custom text matcher function
    const findText = (content, element) => {
      const hasText = (node) => node.textContent === content;
      const elementHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(
        (child) => !hasText(child)
      );
      return elementHasText && childrenDontHaveText;
    };

    // Check if the title "Top Collections" is displayed
    const collectionTitle = screen.getByText("Top Collections");
    expect(collectionTitle).toBeInTheDocument();

    // Check if the "See More" link is present
    const seeMoreLink = screen.getByText("See More");
    expect(seeMoreLink).toBeInTheDocument();

    // Check if the "Hot topics" title is displayed
    const hotTopicsTitle = screen.getByText("Hot topics");
    expect(hotTopicsTitle).toBeInTheDocument();

    // Check if the card text is displayed
    const cardText = screen.getByText(/Don't miss out on the latest news/i);
    expect(cardText).toBeInTheDocument();

    // Check if the "Previous" button is present
    const previousButton = screen.getByLabelText("previous");
    expect(previousButton).toBeInTheDocument();

    // Check if the "Next" button is present
    const nextButton = screen.getByLabelText("next");
    expect(nextButton).toBeInTheDocument();
  });

  test('slides to the next item when the "Next" button is clicked', () => {
    render(<Collection />);

    // Find the slider container
    const sliderContainer = screen.getByTestId("slider-container");

    // Find the current slide position
    const currentSlidePos = sliderContainer.children[0].offsetLeft;

    // Click the "Next" button
    const nextButton = screen.getByLabelText("next");
    fireEvent.click(nextButton);

    // Check if the slider container has moved to the next item
    expect(sliderContainer.style.transform).toBe(
      `translateX(-${currentSlidePos}px)`
    );
  });

  test('slides to the previous item when the "Previous" button is clicked', () => {
    render(<Collection />);

    // Find the slider container
    const sliderContainer = screen.getByTestId("slider-container");

    // Find the current slide position
    const currentSlidePos = sliderContainer.children[0].offsetLeft;

    // Click the "Previous" button
    const previousButton = screen.getByLabelText("previous");
    fireEvent.click(previousButton);

    // Check if the slider container has moved to the previous item
    expect(sliderContainer.style.transform).toBe(
      `translateX(-${currentSlidePos}px)`
    );
  });

  test("slides correctly when the window is resized", () => {
    render(<Collection />);

    // Find the slider container
    const sliderContainer = screen.getByTestId("slider-container");

    // Mock the window.matchMedia function to simulate a resize
    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: true,
    }));

    // Trigger a window resize event
    fireEvent(window, new Event("resize"));

    // Check if the slider container has moved correctly based on the resize
    expect(sliderContainer.style.transform).toBe("translateX(-0px)");
  });

  test("renders the slider items with correct image source, title, and discussion count", () => {
    render(<Collection />);

    // Check if the slider items have the correct image source, title, and discussion count
    const sliderItems = screen.getAllByRole("listitem");
    const sliderItemData = [
      ["project-1_og57fa", "Web Development", "38"],
      ["project-4_x9xvcm", "Mobile App Development", "18"],
      ["project-7_bscngj", "Data Science", "48"],
      ["project-6_f65txj", "Cybersecurity", "12"],
      ["project-5_qdb9b4", "Cloud Computing", "38"],
      ["project-3_ki6k8n", "UI/UX Design", "76"],
      ["project-2_zchefq", "IT Project Management", "18"],
      ["project-8_ghfk9n", "Database Administration", "48"],
      ["project-9_pbpj9u", "IT Support and Helpdesk", "12"],
    ];

    sliderItems.forEach((item, index) => {
      const image = item.querySelector("img");
      const title = item.querySelector(".slider-title");
      const discussionCount = item.querySelector(".slider-subtitle");

      expect(image.src).toContain(sliderItemData[index][0]);
      expect(title.textContent).toBe(sliderItemData[index][1]);
      expect(discussionCount.textContent).toBe(
        `${sliderItemData[index][2]} Discussions`
      );
    });
  });
});
