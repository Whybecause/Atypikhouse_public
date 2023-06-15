/**
 * @jest-environment jsdom
 */

 import React from "react";
 import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import AuthModal from "./auth-modal.component";

test("render the component without crashing", () => {
  render(<AuthModal />)
  expect(screen.getByRole("img")).toBeDefined();
  fireEvent.click(screen.getByRole("img"))
  expect(screen.getByText(/Bienvenue chez Atypikhouse/i)).toBeInTheDocument();
})