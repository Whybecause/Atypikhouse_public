// Import Third-party Dependencies
import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";


const VoteInput = ({ setRate, rate }) => {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <StarIcon
            key={i}
            onClick={() => setRate(i + 1)}
            color={i < rate ? "teal.500" : "gray.300"}
          />
        ))}
    </Box>
  );
};

export default VoteInput;
