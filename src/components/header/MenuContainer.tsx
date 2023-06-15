// Import Third-party Dependencies
import React, { ReactNode } from "react";
import Link from "next/link";
import { Box } from "@chakra-ui/layout";

interface MenuContainer {
  children: ReactNode;
  isActive: (value: string) => boolean;
  className?: string;
}

const MenuContainer = ({ children, className, isActive}: MenuContainer): JSX.Element => {
  return (
    <Box className={className}>
      <Box d="flex" alignItems="center" h="100%">
        <Box w="50%" d="flex" justifyContent="space-around">
          <Box></Box>
          <Link href="/become_host">
            <Box
              as="a"
              color="brand.light"
              textDecoration={isActive("/become-host") ? "underline" : "none"}
            >
              Devenir hôte
            </Box>
          </Link>
        </Box>
        <Box
          w="50%"
          d="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Link href="/atypikhouse">
            <Box
              as="a"
              color="brand.light"
              textDecoration={isActive("/atypikhouse") ? "underline" : "none"}
            >
              Qui sommes-nous?
            </Box>
          </Link>
          <Box className="user-container">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};


export default MenuContainer;
