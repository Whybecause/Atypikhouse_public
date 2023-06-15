// Import Third-party Dependencies
import React from "react";

const CommentMessage = ({ tenantFinishedReservation }): JSX.Element => {
  return (
    <p>{tenantFinishedReservation?.commentary?.[0]?.content}</p>
  );
};

export default CommentMessage;
