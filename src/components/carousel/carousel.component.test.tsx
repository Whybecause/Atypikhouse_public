
/**
 * @jest-environment jsdom
 */

// Import Third-party Dependencies
import React from "react";
import { render, screen } from "@testing-library/react";

// Import Internal Dependencies
import MyCarousel from "./carousel.component";

// CONST
const images = ["/jump.jpg", "/jumbo.jpg"];

describe("MyCarousel", () => {
  it("should render the title", () => {
    render(<MyCarousel images={images} />);

    expect(screen.getAllByRole("img")).toBeDefined();
  });
});
