import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { ImageSkeleton } from "../styledComponent";

const CTARent = () => {

  return (
    <Box as="section" mt="5">
      <Box as="h2" mb="5">Qu'est-ce qu'une expérience atypique ?</Box>

      <Box
        d="flex"
        flexWrap="nowrap"
        overflowX="auto"
        justifyContent="space-between"
      >

        <Box flex="0 0 auto" textAlign="center">
          <ImageSkeleton
            src="/content/travel.jpg"
            alt="aventure"
            w="300px"
            h="300px"
            objectFit="cover"
            borderRadius="2xl"
          />
          <h4>Partez à l'aventure</h4>
        </Box>

        <Box flex="0 0 auto" textAlign="center">
          <ImageSkeleton
            ml="1"
            src="/content/nature.jpg"
            alt="déconnexion"
            w="300px"
            h="300px"
            objectFit="cover"
            flex="0 0 auto"

            borderRadius="2xl"
          />
          <h4>Déconnectez vous du quotidien</h4>
        </Box>

        <Box flex="0 0 auto" textAlign="center">
          <ImageSkeleton
            ml="1"
            src="/content/travel2.jpg"
            alt="souvenirs"
            w="300px"
            h="300px"
            objectFit="cover"
            borderRadius="2xl"
            flex="0 0 auto"

          />
          <h4>Vivez des moments inoubliables</h4>
        </Box>

      </Box>
    </Box >
  )
}


export default CTARent;
