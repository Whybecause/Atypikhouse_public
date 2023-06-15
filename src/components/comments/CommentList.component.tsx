// Import Third-party Dependencies
import React from "react";
import CommentExcerpt from "./CommentExcerpt.component";

const CommentList = ({ reviews }): JSX.Element => {

  return (
    <>
      {reviews?.map((review) => (
        <CommentExcerpt key={review?.historicalId} review={review} />
      ))}
    </>
  );
};

export default CommentList;

