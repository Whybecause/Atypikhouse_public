// Import Third-party Dependencies
import React from "react";
import Link from "next/link";
import { Box, Avatar, Center } from "@chakra-ui/react";

const LogoContainer: React.FC = (): JSX.Element => {
  return (
    <Box position="relative" top={["55px", "42px"]}>
      <Center>
        <Link href="/">
          <Avatar
            src="/icons/icons-512x512.png"
            alt="logo"
            width={["40px", "60px"]}
            height={["40px", "60px"]}
            className="pointer"
          />
        </Link>
      </Center>
    </Box>
  );
};


export default LogoContainer;
