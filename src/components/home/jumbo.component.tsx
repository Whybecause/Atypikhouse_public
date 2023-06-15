// Import Third-party Dependencies
import React from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import { ImageSkeleton } from "../styledComponent";

const Jumbo = (): JSX.Element => {

  return (
    <Box position="relative" textAlign="center">
      <AspectRatio
        w="100%"
        ratio={16 / 9}
      >
        <ImageSkeleton
          src="/jum.jpg"
          objectFit="cover"
        />
      </AspectRatio>
      <Box
        position="absolute"
        transform="translate(-50%, -50%)"
        top="50%"
        left="50%"
        bg="rgba(0, 0, 0, 0.6)"
        color="brand.light"
        w="50%"
        d="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="xl"
        p="5"
      >
        <h2>Envie d'aventures insolites ?</h2>
      </Box>
    </Box>
  );
};


export default Jumbo;
