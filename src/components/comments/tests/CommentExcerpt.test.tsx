/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from '@testing-library/react'
import { mockedUser } from "../../../../__mocks__/mockedUser";
import { mockedReview } from "../../../../__mocks__/mockedReview";
import CommentExcerpt from "../CommentExcerpt.component";

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(selector => selector()),
  useDispatch: () => mockDispatch
}));

jest.mock('../../../slices/userSlice', () => ({
  selectUser: jest.fn().mockReturnValue(mockedUser),
}));


test("display review for all users & actions for admins", async () => {
  render(<CommentExcerpt review={mockedReview} />);

  const reviewAuthor = screen.getByText(/Maxence Traina/i);
  expect(reviewAuthor).toBeInTheDocument();
  const authorImage = screen.getByRole("img");
  expect(authorImage).toBeInTheDocument();

  const linkToProperty = screen.getByText(/Propriété 1/i).closest('a');
  expect (linkToProperty).toHaveAttribute('href', '/property/1');
})

