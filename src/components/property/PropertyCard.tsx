// Import Third-party Dependencies
import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Import Internal Dependencies
import MyCarousel from "../carousel/carousel.component";

const PropertyCard = ({ children, property }): JSX.Element => {
  const images = property?.images["map"](image => image.uri);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
    >
      <Box
        boxShadow="lg"
        borderColor="brand.blue2"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundSize="cover"
      >
          <MyCarousel images={images} />
        <Box pl="3" pr="3" pb="3" mt="1">
          {children}
        </Box>

      </Box>
    </motion.div>
  );
};


export default PropertyCard;
