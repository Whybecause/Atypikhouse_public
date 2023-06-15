// Import Third-party Dependencies
import React from "react";
import { Text } from "@chakra-ui/react";

const CommentContainer = ({children}): JSX.Element => {
  return (
    <>
      <Text fontWeight="bold">Votre commentaire : </Text>
      {children}
    </>
  );
};

export default CommentContainer;
