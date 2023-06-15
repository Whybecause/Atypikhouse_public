/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from '@testing-library/react'
import CommentContainer from "../CommentContainer";


test("it should render the title", async () => {
  render(<CommentContainer children={<></>} />);

  expect(screen.getByText(/Votre commentaire/i)).toBeInTheDocument();
})

