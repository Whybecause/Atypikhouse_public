/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from '@testing-library/react'
import { mockedUser } from "../../../../__mocks__/mockedUser";
import { mockedReviews } from "../../../../__mocks__/mockedReview";
import CommentList from "../CommentList.component";

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(selector => selector()),
  useDispatch: () => mockDispatch
}));

jest.mock('../../../slices/userSlice', () => ({
  selectUser: jest.fn().mockReturnValue(mockedUser),
}));


test("should render the list of reviews", async () => {
  render(<CommentList reviews={mockedReviews} />);
  const images = screen.getAllByRole("img");
  expect(images).toBeDefined();
})

