// Import Third-party Dependencies
import React from "react";
import { SimpleGrid } from "@chakra-ui/react";

const PropertyListContainer = ({ children }): JSX.Element => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing="20px" p="6">
      {children}
    </SimpleGrid>
  );
};


export default PropertyListContainer;
