// Import External Dependencies
import React from "react";
import Link from "next/link";

import { Box, Image, Button } from "@chakra-ui/react";
import { ImageSkeleton } from "../styledComponent";

const CTABecomeHost: React.FC = (): JSX.Element => {

  return (
    <Box as="section" position="relative" textAlign="center" mt="5" mb="5">
      <ImageSkeleton
        src="/content/host.jpg"
        alt="host"
        objectFit="cover"
        w="100%"
        h="400px"
        borderRadius="3xl"
      />
      <Box
        as="article"
        position="absolute"
        transform="translate(-50%, -50%)"
        top="50%"
        left="50%"
        color="white"
        p="5"
        borderRadius="2xl"
        bg="rgba(0, 0, 0, 0.7)"
        textAlign="center"
        width={["95%", "70%", "50%"]}

      >
        <h2>Devenez hôte</h2>
        <Box as="p" p="5" fontWeight="bold">
          Vous possédez un logement atypique et souhaitez gagner un revenu complétaire ?
        </Box>
        <Link href="/become_host">
          <Button variant="light">En savoir plus</Button>
        </Link>
      </Box>
    </Box>

  )
}


export default CTABecomeHost;
