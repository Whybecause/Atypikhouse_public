// Import Third-party Dependencies
import React from "react";
import { Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const PropertyRating = ({ property }): JSX.Element => {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <StarIcon
            key={i}
            color={i < property?.rate ? "teal.500" : "gray.300"}
          />
        ))}
    </Box>
  );
};


export default PropertyRating;
