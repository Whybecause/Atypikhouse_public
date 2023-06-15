// Import Third-party Dependencies
import React from "react";
import {
  Text,
  Stack,
  Divider
} from "@chakra-ui/react";


const VoteContainer = ({ children }): JSX.Element => {
  return (
    <Stack direction="row">
      <Text fontWeight="bold">Note :</Text>
      {children}
    </Stack>
  );
};

export default VoteContainer;
